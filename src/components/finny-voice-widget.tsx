"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Phone, PhoneOff, Volume2, VolumeX } from 'lucide-react';

interface FinnyVoiceWidgetProps {
  className?: string;
}

interface SpeechRecognitionEvent {
  readonly resultIndex: number;
  readonly results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  readonly error: string;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onresult: ((event: SpeechRecognitionEvent) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEvent) => void) | null;
  onend: (() => void) | null;
}

declare global {
  interface Window {
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

export function FinnyVoiceWidget({ className = "" }: FinnyVoiceWidgetProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected' | 'error'>('disconnected');
  const [finnyMessage, setFinnyMessage] = useState("Hi! I'm Finny, your financial assistant. Click to start chatting!");
  const [transcript, setTranscript] = useState('');
  
  // Speech recognition and synthesis
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const [speechSupported, setSpeechSupported] = useState(false);

  const handleUserSpeech = useCallback(async (userText: string) => {
    console.log('User said:', userText);
    
    // Process the user's speech with Finny
    try {
      const response = await fetch('/api/finny-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      
      if (response.ok) {
        const data = await response.json();
        const finnyResponse = data.response;
        setFinnyMessage(finnyResponse);
        speakResponse(finnyResponse);
      } else {
        // Fallback to mock financial responses
        const mockResponse = generateMockFinnyResponse(userText);
        setFinnyMessage(mockResponse);
        speakResponse(mockResponse);
      }
    } catch (error) {
      console.error('Error calling Finny API:', error);
      const mockResponse = generateMockFinnyResponse(userText);
      setFinnyMessage(mockResponse);
      speakResponse(mockResponse);
    }
  }, []);

  // Initialize speech APIs
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Check for speech recognition support
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition && window.speechSynthesis) {
        setSpeechSupported(true);
        synthRef.current = window.speechSynthesis;
        
        // Initialize speech recognition
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
          let finalTranscript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              finalTranscript += result[0].transcript;
            }
          }
          
          if (finalTranscript) {
            setTranscript(finalTranscript);
            handleUserSpeech(finalTranscript);
          }
        };

        recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }
    }
  }, [handleUserSpeech]);

  const generateMockFinnyResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();
    
    if (lowerText.includes('stock') || lowerText.includes('price') || lowerText.includes('apple') || lowerText.includes('tesla') || lowerText.includes('google')) {
      return "I can help you with stock prices! For real-time data, I'm connecting to Yahoo Finance. Which specific stock would you like to know about?";
    } else if (lowerText.includes('bitcoin') || lowerText.includes('crypto') || lowerText.includes('ethereum')) {
      return "Cryptocurrency is very volatile right now. I can get you the latest prices and help you understand the risks. Would you like current Bitcoin or Ethereum prices?";
    } else if (lowerText.includes('budget') || lowerText.includes('save') || lowerText.includes('money')) {
      return "Great question about budgeting! I recommend the 50-30-20 rule: 50% for needs, 30% for wants, and 20% for savings. What's your monthly income?";
    } else if (lowerText.includes('invest') || lowerText.includes('portfolio')) {
      return "Investment planning is crucial for your financial future. I can help analyze your risk tolerance and suggest diversified portfolio options. What's your investment timeline?";
    } else if (lowerText.includes('retirement') || lowerText.includes('401k')) {
      return "Retirement planning is so important! Starting early with compound interest makes a huge difference. Are you contributing to a 401k or IRA?";
    } else {
      return "I'm here to help with all your financial questions! You can ask me about stock prices, budgeting, investments, retirement planning, or any other money matters.";
    }
  };

  const speakResponse = (text: string) => {
    if (!synthRef.current || isMuted) return;
    
    // Cancel any ongoing speech
    synthRef.current.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.1;
    utterance.volume = 0.8;
    
    // Find a pleasant voice
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Samantha') || 
      voice.name.includes('Karen') || 
      voice.name.includes('Female') ||
      voice.lang.includes('en-US')
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    synthRef.current.speak(utterance);
  };

  const connectToFinny = async () => {
    if (!speechSupported) {
      setConnectionStatus('error');
      setFinnyMessage("Sorry, your browser doesn't support voice features. Please try Chrome or Safari for the best experience.");
      return;
    }

    setConnectionStatus('connecting');
    setFinnyMessage("Connecting to Finny...");
    
    try {
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setIsConnected(true);
      setConnectionStatus('connected');
      const welcomeMessage = "Hi! I'm Finny, your personal finance assistant! I can help you with real-time stock prices, investment analysis, budgeting advice, and financial planning. What would you like to discuss?";
      setFinnyMessage(welcomeMessage);
      speakResponse(welcomeMessage);
      
    } catch (error) {
      console.error('Failed to connect to Finny:', error);
      setConnectionStatus('error');
      setFinnyMessage("Sorry, I couldn't connect right now. Please try again!");
    }
  };

  const disconnectFromFinny = () => {
    setIsConnected(false);
    setIsListening(false);
    setIsSpeaking(false);
    setConnectionStatus('disconnected');
    setFinnyMessage("Hi! I'm Finny, your financial assistant. Click to start chatting!");
    
    // Stop speech recognition and synthesis
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    if (synthRef.current) {
      synthRef.current.cancel();
    }
  };

  const toggleMicrophone = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (synthRef.current && isSpeaking) {
      if (!isMuted) {
        synthRef.current.cancel();
        setIsSpeaking(false);
      }
    }
  };

  return (
    <div className={`fixed bottom-6 right-6 z-50 ${className}`}>
      {/* Main Voice Widget */}
      <div className="relative">
        {/* Connection Status Indicator */}
        <div className={`absolute -top-2 -right-2 w-4 h-4 rounded-full ${
          connectionStatus === 'connected' ? 'bg-green-500' :
          connectionStatus === 'connecting' ? 'bg-yellow-500 animate-pulse' :
          connectionStatus === 'error' ? 'bg-red-500' :
          'bg-gray-500'
        }`} />

        {/* Main Button */}
        <button
          onClick={isConnected ? disconnectFromFinny : connectToFinny}
          disabled={connectionStatus === 'connecting'}
          className={`w-16 h-16 rounded-full shadow-lg transition-all duration-300 ${
            isConnected 
              ? 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600' 
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
          } ${
            isSpeaking ? 'animate-pulse scale-110' : ''
          } ${
            connectionStatus === 'connecting' ? 'animate-spin' : ''
          }`}
        >
          {connectionStatus === 'connecting' ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
          ) : isConnected ? (
            <PhoneOff className="w-6 h-6 text-white mx-auto" />
          ) : (
            <Phone className="w-6 h-6 text-white mx-auto" />
          )}
        </button>

        {/* Control Buttons (when connected) */}
        {isConnected && speechSupported && (
          <div className="absolute bottom-0 right-20 flex space-x-2">
            <button
              onClick={toggleMicrophone}
              className={`w-12 h-12 rounded-full shadow-md transition-all ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600 animate-pulse' 
                  : 'bg-gray-600 hover:bg-gray-700'
              }`}
            >
              {isListening ? (
                <Mic className="w-5 h-5 text-white mx-auto" />
              ) : (
                <MicOff className="w-5 h-5 text-white mx-auto" />
              )}
            </button>

            <button
              onClick={toggleMute}
              className={`w-12 h-12 rounded-full shadow-md transition-all ${
                isMuted 
                  ? 'bg-gray-600 hover:bg-gray-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              {isMuted ? (
                <VolumeX className="w-5 h-5 text-white mx-auto" />
              ) : (
                <Volume2 className="w-5 h-5 text-white mx-auto" />
              )}
            </button>
          </div>
        )}
      </div>

      {/* Finny's Message Bubble */}
      {(isConnected || connectionStatus === 'connecting' || connectionStatus === 'error') && (
        <div className="absolute bottom-20 right-0 max-w-xs">
          <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 border ${
            isSpeaking ? 'border-blue-400 shadow-blue-100' : 'border-gray-200 dark:border-gray-700'
          }`}>
            <div className="flex items-start space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                isSpeaking ? 'bg-blue-500 animate-pulse' : 'bg-gradient-to-r from-purple-500 to-pink-500'
              }`}>
                <span className="text-white text-sm font-bold">F</span>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Finny</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {finnyMessage}
                </p>
                {isSpeaking && (
                  <div className="flex space-x-1 mt-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                )}
                
                {/* Show what user said */}
                {transcript && (
                  <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                    <span className="text-gray-500">You said: </span>
                    <span className="text-gray-800 dark:text-gray-200">&quot;{transcript}&quot;</span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Triangle pointer */}
            <div className="absolute bottom-0 right-6 transform translate-y-full">
              <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-white dark:border-t-gray-800"></div>
            </div>
          </div>
        </div>
      )}

      {/* Voice Visualization */}
      {isConnected && isListening && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1 bg-red-500 rounded animate-pulse`}
                style={{
                  height: `${Math.random() * 20 + 10}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Speech not supported warning */}
      {!speechSupported && connectionStatus === 'error' && (
        <div className="absolute bottom-20 right-0 max-w-xs">
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
            <p className="text-sm text-red-800 dark:text-red-200">
              Voice features need Chrome or Safari browser for best experience.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
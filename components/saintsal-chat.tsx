"use client"

import { useChat } from "ai/react"
import { useState, useRef, useEffect } from "react"
import Image from "next/image"

export function SaintSalChat() {
  const [isOpen, setIsOpen] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const { messages, input, handleInputChange, handleSubmit, isLoading, error } = useChat({
    api: "/api/chat",
    onError: (error) => {
      console.error("[v0] Chat error:", error)
    },
  })

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const toggleChat = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      {/* Floating Chat Button */}
      <button onClick={toggleChat} className="saintsal-chat-button" aria-label="Open SaintSal AI Chat">
        <Image
          src="/images/cookinpartners-logo.png"
          alt="SaintSal AI"
          width={40}
          height={40}
          className="chat-button-logo"
        />
        <span className="chat-button-pulse"></span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="saintsal-chat-window">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <Image src="/images/cookinpartners-logo.png" alt="SaintSal" width={32} height={32} />
              <div>
                <h3>SaintSal™ AI</h3>
                <p>Your Partner Success Assistant</p>
              </div>
            </div>
            <div className="chat-header-actions">
              <button onClick={toggleChat} className="chat-close" aria-label="Close chat">
                ✕
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.length === 0 && (
              <div className="chat-welcome">
                <Image src="/images/cookinpartners-logo.png" alt="SaintSal" width={60} height={60} />
                <h4>Welcome to SaintSal™ AI</h4>
                <p>Ask me anything about:</p>
                <ul>
                  <li>Partner program & commissions</li>
                  <li>SaintSal AI platforms & features</li>
                  <li>Application process & requirements</li>
                  <li>Our technology & HACP™ patent</li>
                  <li>Products, pricing, and support</li>
                </ul>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.role}`}>
                {message.role === "assistant" && (
                  <Image
                    src="/images/cookinpartners-logo.png"
                    alt="SaintSal"
                    width={28}
                    height={28}
                    className="message-avatar"
                  />
                )}
                <div className="message-content">{message.content}</div>
              </div>
            ))}

            {error && (
              <div className="chat-message error">
                <div className="message-content">Sorry, I encountered an error. Please try again.</div>
              </div>
            )}

            {isLoading && (
              <div className="chat-message assistant">
                <Image
                  src="/images/cookinpartners-logo.png"
                  alt="SaintSal"
                  width={28}
                  height={28}
                  className="message-avatar"
                />
                <div className="message-content typing">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="chat-input-form">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask SaintSal anything..."
              className="chat-input"
              disabled={isLoading}
            />
            <button type="submit" className="chat-send" disabled={isLoading || !input.trim()}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M22 2L11 13M22 2L15 22L11 13M22 2L2 8L11 13"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  )
}

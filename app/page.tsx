"use client"

import useWebRTCAudioSession from "@/hooks/use-webrtc"
import { BroadcastButton } from "@/components/broadcast-button"
import { StatusDisplay } from "@/components/status"
import Transcriber from "@/components/ui/transcriber"
import { motion } from "framer-motion"

export default function App() {
  const { status, isSessionActive, handleStartStopClick, conversation } =
    useWebRTCAudioSession("alloy")

  return (
    <main className="flex flex-col items-center w-full max-w-2xl mx-auto px-4 py-12 gap-8">
      {/* XR Brand Header */}
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* XR Logo */}
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-md"
          style={{ backgroundColor: "#1A6B8A" }}
        >
          <span className="text-white font-bold text-xl tracking-widest">XR</span>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            XR Voice
          </h1>
          <p className="text-muted-foreground mt-1.5 text-sm">
            点击开始，然后说话 — AI 将以语音回应
          </p>
        </div>
      </motion.div>

      {/* Start/Stop Button */}
      <motion.div
        className="w-full max-w-xs"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.15, duration: 0.4 }}
      >
        <BroadcastButton isSessionActive={isSessionActive} onClick={handleStartStopClick} />
      </motion.div>

      {/* Transcript Panel — appears after first message */}
      {conversation.length > 0 && (
        <motion.div
          className="w-full h-[420px] rounded-2xl border shadow-sm overflow-hidden"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <Transcriber conversation={conversation} />
        </motion.div>
      )}

      {/* XR subtle footer brand */}
      <motion.p
        className="text-xs text-muted-foreground/60 mt-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Powered by Xinrui · OpenAI Realtime
      </motion.p>

      {status && <StatusDisplay status={status} />}
    </main>
  )
}

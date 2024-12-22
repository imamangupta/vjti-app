"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { FiClock, FiCheck, FiPlayCircle, FiPauseCircle, FiRotateCcw, FiVolume2 } from 'react-icons/fi'

const FOCUS_TIME = 25 * 60; // 25 minutes
const BREAK_TIME = 5 * 60; // 5 minutes

export default function FocusMode() {
  const [isActive, setIsActive] = useState(false)
  const [isMeditationMode, setIsMeditationMode] = useState(false)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState('')
  const [timer, setTimer] = useState(FOCUS_TIME)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [completedPomodoros, setCompletedPomodoros] = useState(0)
  const [dailyGoal, setDailyGoal] = useState(8)
  const [selectedAudio, setSelectedAudio] = useState("")
  const [volume, setVolume] = useState(50)

  useEffect(() => {
    let interval
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)
    } else if (timer === 0) {
      handleTimerComplete()
    }
    return () => clearInterval(interval)
  }, [isTimerRunning, timer])

  const handleTimerComplete = useCallback(() => {
    setIsTimerRunning(false)
    if (!isBreak) {
      setCompletedPomodoros((prev) => prev + 1)
      setIsBreak(true)
      setTimer(BREAK_TIME)
    } else {
      setIsBreak(false)
      setTimer(FOCUS_TIME)
    }
  }, [isBreak])

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  const handleAddTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask.trim(), completed: false }])
      setNewTask('')
    }
  }

  const handleToggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const handleRemoveTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const dailyProgress = (completedPomodoros / dailyGoal) * 100

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <Card className="w-full max-w-2xl bg-white shadow-xl rounded-2xl overflow-hidden">
        <CardHeader className="bg-blue-600 text-white">
          <CardTitle className="text-3xl font-bold">
            <span>Focus & Meditation Mode</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-blue-800">Activate Focus & Meditation</span>
              <Switch
                checked={isActive}
                onCheckedChange={setIsActive}
                className="data-[state=checked]:bg-green-500"
              />
            </div>

            {isActive && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-medium text-blue-800">
                    {isMeditationMode ? "Meditation Mode" : "Focus Mode"}
                  </span>
                  <Switch
                    checked={isMeditationMode}
                    onCheckedChange={setIsMeditationMode}
                    className="data-[state=checked]:bg-purple-500"
                  />
                </div>

                <Tabs defaultValue={isMeditationMode ? "meditation" : "focus"} className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="focus">Focus</TabsTrigger>
                    <TabsTrigger value="meditation">Meditation</TabsTrigger>
                  </TabsList>
                  <TabsContent value="focus" className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                      <div className="flex items-center space-x-2 flex-grow">
                        <FiClock className="text-blue-600 text-2xl" />
                        <span className="text-3xl font-bold text-blue-800">{formatTime(timer)}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={`flex-grow ${isTimerRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
                        >
                          {isTimerRunning ? 'Pause' : 'Start'}
                        </Button>
                        <Button
                          onClick={() => {
                            setTimer(FOCUS_TIME)
                            setIsTimerRunning(false)
                            setIsBreak(false)
                          }}
                          variant="outline"
                          className="flex-grow border-blue-600 text-blue-600 hover:bg-blue-100"
                        >
                          Reset
                        </Button>
                      </div>
                    </div>
                    <div className="text-center text-sm text-blue-600">
                      {isBreak ? 'Break Time!' : 'Focus Time'} | Completed Pomodoros: {completedPomodoros}
                    </div>
                    <Progress value={dailyProgress} className="w-full" />
                    <div className="text-center text-sm text-blue-600">
                      Daily Goal Progress: {completedPomodoros} / {dailyGoal} Pomodoros
                    </div>
                    <div className="flex space-x-2">
                      <Input
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        placeholder="Add a new task"
                        className="flex-grow"
                      />
                      <Button onClick={handleAddTask} className="bg-blue-600 hover:bg-blue-700">Add</Button>
                    </div>
                    <ul className="space-y-2 max-h-64 overflow-y-auto">
                      {tasks.map((task) => (
                        <li
                          key={task.id}
                          className="flex items-center justify-between bg-blue-100 p-2 rounded"
                        >
                          <span className={`text-blue-800 ${task.completed ? 'line-through' : ''}`}>{task.text}</span>
                          <div className="flex space-x-2">
                            <Button
                              onClick={() => handleToggleTask(task.id)}
                              variant="ghost"
                              size="sm"
                              className="text-green-600 hover:text-green-700"
                            >
                              <FiCheck />
                            </Button>
                            <Button
                              onClick={() => handleRemoveTask(task.id)}
                              variant="ghost"
                              size="sm"
                              className="text-red-600 hover:text-red-700"
                            >
                              &times;
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="meditation" className="space-y-4">
                    <div className="space-y-4">
                      <div>
                        <label className="text-lg font-medium text-blue-800">Select Guided Meditation Audio:</label>
                        <Select onValueChange={setSelectedAudio}>
                          <SelectTrigger className="w-full mt-2">
                            <SelectValue placeholder="Select Audio" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="https://www.bensound.com/bensound-music/bensound-meditation.mp3">Calm Ocean Waves</SelectItem>
                            <SelectItem value="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3">Forest Ambience</SelectItem>
                            <SelectItem value="https://www.sample-videos.com/audio/mp3/wave.mp3">Zen Garden</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      {selectedAudio && (
                        <div className="space-y-4">
                          <audio controls className="w-full">
                            <source src={selectedAudio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                          </audio>
                          <div className="flex items-center space-x-2">
                            <FiVolume2 className="h-6 w-6" />
                            <Slider
                              value={[volume]}
                              onValueChange={(values) => setVolume(values[0])}
                              max={100}
                              step={1}
                              className="w-full"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
                      <div className="flex items-center space-x-2 flex-grow">
                        <FiClock className="text-blue-600 text-2xl" />
                        <span className="text-3xl font-bold text-blue-800">{formatTime(timer)}</span>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => setIsTimerRunning(!isTimerRunning)}
                          className={`flex-grow ${isTimerRunning ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'}`}
                        >
                          {isTimerRunning ? <FiPauseCircle className="mr-2" /> : <FiPlayCircle className="mr-2" />}
                          {isTimerRunning ? 'Pause' : 'Start'}
                        </Button>
                        <Button
                          onClick={() => {
                            setTimer(FOCUS_TIME)
                            setIsTimerRunning(false)
                          }}
                          variant="outline"
                          className="flex-grow border-blue-600 text-blue-600 hover:bg-blue-100"
                        >
                          <FiRotateCcw className="mr-2" />
                          Reset
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}


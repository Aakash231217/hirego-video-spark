import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Play, 
  Square, 
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  CheckCircle
} from "lucide-react";

const jobQuestions = {
  1: { // Frontend Developer
    title: "Frontend Developer",
    company: "TechCorp",
    questions: [
      "Tell us about yourself and why you're interested in frontend development.",
      "Describe your experience with React and modern JavaScript frameworks.",
      "How do you approach responsive design and cross-browser compatibility?",
      "Walk us through a challenging project you've worked on recently.",
      "How do you stay updated with the latest frontend technologies and trends?"
    ]
  },
  2: { // Data Scientist
    title: "Data Scientist",
    company: "DataFlow Inc",
    questions: [
      "Introduce yourself and explain your passion for data science.",
      "Describe your experience with machine learning algorithms and Python.",
      "How do you approach data cleaning and preprocessing?",
      "Tell us about a data science project that had real business impact.",
      "How do you communicate complex technical findings to non-technical stakeholders?",
      "What's your experience with big data technologies and cloud platforms?",
      "How do you ensure the ethical use of data in your work?"
    ]
  }
} as const;

type JobId = keyof typeof jobQuestions;

const VideoRecording = () => {
  const { jobId: jobIdParam } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  
  // Convert string parameter to number and validate
  const jobId = jobIdParam ? parseInt(jobIdParam, 10) as JobId : null;
  const job = jobId && jobId in jobQuestions ? jobQuestions[jobId] : null;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [micEnabled, setMicEnabled] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    startCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording && !isPaused) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording, isPaused]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  };

  const toggleCamera = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      videoTrack.enabled = !cameraEnabled;
      setCameraEnabled(!cameraEnabled);
    }
  };

  const toggleMic = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      audioTrack.enabled = !micEnabled;
      setMicEnabled(!micEnabled);
    }
  };

  const startRecording = () => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          setRecordedChunks(prev => [...prev, event.data]);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsPaused(false);
    }
  };

  const nextQuestion = () => {
    if (job && currentQuestion < job.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setRecordingTime(0);
      setRecordedChunks([]);
    } else {
      setIsCompleted(true);
    }
  };

  const prevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setRecordingTime(0);
      setRecordedChunks([]);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const submitVideoResume = () => {
    // Here you would typically upload the recorded videos
    console.log("Submitting video resume...");
    navigate('/candidate/dashboard');
  };

  if (!job) {
    return <div>Job not found</div>;
  }

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <CardTitle>Video Resume Completed!</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600">
              Thank you for completing your video resume for the {job.title} position at {job.company}.
            </p>
            <p className="text-sm text-gray-500">
              Our AI is now analyzing your responses. You'll receive feedback and results soon!
            </p>
            <Button onClick={submitVideoResume} className="w-full">
              Submit Application
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>{job.title}</CardTitle>
                <p className="text-gray-600">{job.company}</p>
              </div>
              <Badge variant="outline">
                Question {currentQuestion + 1} of {job.questions.length}
              </Badge>
            </div>
            <Progress 
              value={((currentQuestion + 1) / job.questions.length) * 100}
              className="w-full"
            />
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Video Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  className="w-full h-64 bg-black rounded-lg object-cover"
                />
                {!cameraEnabled && (
                  <div className="absolute inset-0 bg-black rounded-lg flex items-center justify-center">
                    <VideoOff className="h-12 w-12 text-white" />
                  </div>
                )}
                
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleCamera}
                    className={cameraEnabled ? "" : "bg-red-100 hover:bg-red-200"}
                  >
                    {cameraEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={toggleMic}
                    className={micEnabled ? "" : "bg-red-100 hover:bg-red-200"}
                  >
                    {micEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                  </Button>
                </div>

                {isRecording && (
                  <div className="absolute top-4 right-4 bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    REC {formatTime(recordingTime)}
                  </div>
                )}
              </div>

              <div className="flex justify-center gap-4 mt-4">
                {!isRecording ? (
                  <Button onClick={startRecording} className="flex items-center gap-2">
                    <Play className="h-4 w-4" />
                    Start Recording
                  </Button>
                ) : (
                  <Button onClick={stopRecording} variant="destructive" className="flex items-center gap-2">
                    <Square className="h-4 w-4" />
                    Stop Recording
                  </Button>
                )}
                <Button variant="outline" onClick={() => setRecordingTime(0)}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Current Question</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-lg font-medium text-blue-900">
                    {job.questions[currentQuestion]}
                  </p>
                </div>
                
                <div className="text-sm text-gray-600 space-y-2">
                  <p><strong>Tips:</strong></p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Take 10-15 seconds to think before answering</li>
                    <li>Keep your answer between 60-90 seconds</li>
                    <li>Be specific and provide examples</li>
                    <li>Maintain eye contact with the camera</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={prevQuestion}
                    disabled={currentQuestion === 0}
                    className="flex items-center gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    onClick={nextQuestion}
                    disabled={!recordedChunks.length}
                    className="flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VideoRecording;

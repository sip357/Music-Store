import AudioPlayer from '../components/audioPlayer';

export default async function Store() {
  const response = await fetch('http://localhost:3000/api/audio');
  const data = await response.json();
  const audioUrl = data.url || null;

  return <AudioPlayer audioUrl={audioUrl} />;
}

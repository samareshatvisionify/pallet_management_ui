import CameraConfigure from '@/components/Settings/CameraSettings/CameraConfigure';

interface CameraConfigPageProps {
  params: Promise<{
    cameraId: string;
  }>;
}

export default async function CameraConfigPage({ params }: CameraConfigPageProps) {
  const { cameraId } = await params;
  return <CameraConfigure cameraId={cameraId} />;
} 
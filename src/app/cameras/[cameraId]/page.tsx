import { CameraDetailsContainer } from '@/containers';

export default async function CameraDetailsPage({ params }: { params: Promise<{ cameraId: string }> }) {
  const { cameraId } = await params;
  return <CameraDetailsContainer cameraId={cameraId} />;
} 
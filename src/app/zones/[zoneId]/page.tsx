import { ZoneDetailsContainer } from '@/containers';

export default async function ZoneDetailsPage({ params }: { params: Promise<{ zoneId: string }> }) {
  const { zoneId } = await params;
  return <ZoneDetailsContainer zoneId={zoneId} />;
} 
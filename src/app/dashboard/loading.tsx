import EventPreviewSkeleton from '@/components/EventPreviewSkeleton';

export default function AttendingPageLoader() {
  const count = 3;
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from(Array(count).keys()).map((num) => (
        <EventPreviewSkeleton key={num} />
      ))}
    </div>
  );
}

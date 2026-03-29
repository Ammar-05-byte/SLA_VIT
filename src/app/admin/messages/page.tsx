import { prisma } from "@/lib/prisma";

export default async function AdminMessagesPage() {
  if (!process.env.DATABASE_URL) {
    return (
      <div className="glass rounded-2xl p-5">
        <h2 className="heading text-xl font-semibold">Contact Messages</h2>
        <p className="mt-3 text-sm text-black/70 dark:text-white/70">Set DATABASE_URL to access stored messages.</p>
      </div>
    );
  }

  const messages: Array<{
    id: string;
    subject: string;
    name: string;
    email: string;
    message: string;
  }> = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  return (
    <div className="glass rounded-2xl p-5">
      <h2 className="heading text-xl font-semibold">Contact Messages</h2>
      <div className="mt-4 space-y-3">
        {messages.map((message) => (
          <div key={message.id} className="rounded-xl border border-black/10 p-4 dark:border-white/10">
            <p className="font-medium">{message.subject}</p>
            <p className="mt-1 text-sm text-black/70 dark:text-white/70">
              {message.name} | {message.email}
            </p>
            <p className="mt-2 text-sm">{message.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const skills = [
  { label: 'Languages & Runtime', value: 'TypeScript, JavaScript, Node.js, C#, .NET, ASP.NET' },
  { label: 'Frontend', value: 'React, Tailwind CSS, shadcn/ui, Vite' },
  { label: 'Backend & Security', value: 'Express, REST APIs, Auth' },
  { label: 'Data & Persistence', value: 'SQL, PostgreSQL, Prisma ORM' },
  { label: 'Testing & Quality', value: 'Vitest, TDD' },
  { label: 'Integrations & Messaging', value: 'Kafka, SOAP, REST, GDS APIs' },
  { label: 'DevOps', value: 'Git, CI/CD, Docker' },
  { label: 'Bonus', value: 'Python, pandas, XGBoost · Telegram Bots · Game Dev (Unity, Godot)' },
];

function About() {
  return (
    <div className="p-3 text-gray-800 leading-relaxed overflow-y-auto">
      <h1 className="text-xl mt-0 font-bold mb-2 text-indigo-600">About Me</h1>
      <div className="text-sm">
        Full-stack engineer with production experience across multi-service architectures
        spanning{' '}
        <span className="font-medium">TypeScript, .NET, Go, Kafka, and SOAP/GDS integrations</span>.
        At <span className="font-semibold text-indigo-700">Yolwise</span>, restored{' '}
        <span className="font-semibold text-indigo-700">~85%</span> of suppressed flight
        inventory across{' '}
        <span className="font-semibold text-indigo-700">10+ major carriers</span> and refactored
        an async Kafka-driven booking pipeline to eliminate silent payment failures — debugging
        root causes across three codebases simultaneously. Previously shipped{' '}
        <span className="font-semibold text-indigo-700">7+</span> production full-stack
        applications with{' '}
        <span className="font-semibold text-indigo-700">1,000s</span> of messages end-to-end
        under assetn.dev.
      </div>

      <h1 className="text-xl font-bold mt-4 mb-2 text-indigo-600">Skills</h1>
      <div className="text-sm space-y-1">
        {skills.map(({ label, value }) => (
          <div key={label}>
            <span className="font-semibold text-gray-900">{label}:</span>{' '}
            <span className="text-gray-700">{value}</span>
          </div>
        ))}
      </div>

      <h1 className="text-xl font-bold mt-4 mb-2 text-indigo-600">Background</h1>
      <div className="text-sm">
        Before engineering, I spent{' '}
        <span className="font-semibold text-indigo-700">
          7+ years as a Senior Associate in BigLaw
        </span>
        . Managed{' '}
        <span className="font-semibold text-gray-900">
          $100M+ M&A and dispute resolution cases
        </span>{' '}
        across <span className="text-gray-900">energy and finance sectors</span>. Legal rigor
        shows up in my code:{' '}
        <span className="font-medium">structured thinking</span>,{' '}
        <span className="font-medium">fast-learning</span>,{' '}
        <span className="font-medium">soft skills</span>,{' '}
        <span className="font-medium">precise problem framing</span>, and a{' '}
        <span className="font-medium">
          bias toward clear architecture and documentation
        </span>
        .
      </div>

      <div className="mt-4 italic border-l-4 text-sm border-indigo-400 pl-4 text-gray-700 bg-indigo-50 p-3 rounded-lg shadow-sm">
        "
        <span className="text-gray-900 font-medium">
          Asset provided us with excellent product and legal service
        </span>{' '}
        and practical advice; his vast knowledge of current legislation and considerable
        experience deserve special mention."
        <br />
        <span className="text-indigo-700 font-semibold">
          — The Legal 500 Europe, Middle East and Asia
        </span>
      </div>
    </div>
  );
}

export default About;

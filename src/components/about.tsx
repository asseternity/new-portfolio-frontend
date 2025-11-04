function About() {
  return (
    <div className="p-3 text-gray-800 leading-relaxed overflow-y-auto">
      <h1 className="text-xl mt-0 font-bold mb-2 text-indigo-600">About Me</h1>
      <div className="text-sm">
        I built <span className="font-semibold text-indigo-700 ">7+</span>{' '}
        scalable, production-ready web applications and integrations with{' '}
        <span className="font-semibold text-indigo-700 ">1,000s</span> of
        messages, using structured thinking. I own the full lifecycle —{' '}
        <span className="font-medium">API design</span>,{' '}
        <span className="font-medium">data modeling</span>,{' '}
        <span className="font-medium">auth & security</span>,{' '}
        <span className="font-medium">testing (Vitest/TDD)</span>, and{' '}
        <span className="font-medium">CI/CD</span>. I enjoy designing systems
        that are <span className="font-semibold">easy to extend</span>,{' '}
        <span className="font-semibold">reason about</span>, and{' '}
        <span className="font-semibold">scale</span> across the full TypeScript
        ecosystem.
      </div>

      <h1 className="text-xl font-bold mt-4 mb-2 text-indigo-600">
        Accomplishments
      </h1>
      <ul className="list-disc list-outside ml-5 space-y-2 text-sm">
        <li>
          Graduate of{' '}
          <span className="font-semibold text-gray-900">
            The Odin Project Full-Stack JavaScript Path
          </span>
        </li>
        <li>
          <span className="font-semibold text-gray-900">IELTS 8.5</span> (2025)
        </li>
        <li>
          Former{' '}
          <span className="font-semibold text-indigo-700">
            Top 5 BigLaw Associate
          </span>{' '}
          (7 years of experience)
        </li>
        <li>
          <span className="text-gray-900 font-semibold">Gamedev:</span> Unity,
          Godot, Articy, Blender
        </li>
        <li>
          <span className="font-semibold text-indigo-700">
            Top University Graduate
          </span>{' '}
          — GPA 4.11/4.33, <span className="text-gray-900">Dean’s List</span>,{' '}
          <span className="text-gray-900">President’s List</span>
        </li>
      </ul>

      <h1 className="text-xl font-bold mt-4 mb-2 text-indigo-600">
        Background
      </h1>
      <div className="text-sm">
        Before engineering, I spent{' '}
        <span className="font-semibold text-indigo-700">
          7+ years as a Senior Associate in BigLaw
        </span>
        . Managed{' '}
        <span className="font-semibold text-gray-900">
          $100M+ M&A and dispute resolution cases
        </span>{' '}
        across <span className="text-gray-900">energy and finance sectors</span>
        . Legal rigor shows up in my code:{' '}
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
        “
        <span className="text-gray-900 font-medium">
          Asset provided us with excellent product and legal service
        </span>{' '}
        and practical advice; his vast knowledge of current legislation and
        considerable experience deserve special mention.”
        <br />
        <span className="text-indigo-700 font-semibold">
          — The Legal 500 Europe, Middle East and Asia
        </span>
      </div>
    </div>
  );
}

export default About;

// src/mockData.js

// Named export
export const mockTasks = [
  {
      id: 1,
      title: 'Set up project repository',
      description:
        'Initialise a Git repo, add a .gitignore, and push the first commit.',
      priority: 'high',
      dueDate: "2027-06-30",
      completed: true
    },
    {
      id: 2,
      title: 'Design database schema',
      description: 'Draft the ERD for the contacts and deals tables.',
      priority: 'high',
      dueDate: "2026-02-03",
      completed: true
    },
    {
      id: 3,
      title: 'Build login page',
      description:
        'Create a login form with email and password fields and basic validation.',
      priority: 'high',
      dueDate: "2025-12-25",
      completed: false
    },
    {
      id: 4,
      title: 'Write unit tests for reducer',
      description:
        'Cover ADD_TASK, DELETE_TASK, and SET_FILTER with at least two cases each.',
      priority: 'medium',
      dueDate: "2025-11-30",
      completed: true
    },
    {
      id: 5,
      title: 'Update README',
      description:
        'Add setup instructions, a screenshot, and a description of the tech stack.',
      priority: 'low',
      dueDate: "2028-12-31",
      completed: false
    },
    {
      id: 6,
      title: 'Deploy to Vercel',
      description:
        'Connect the GitHub repo to Vercel and configure environment variables.',
      priority: 'medium',
      dueDate: "2028-01-01",
      completed: false
    },
];

// Helper to generate unique IDs
export const generateTaskId = () => "t" + Date.now();
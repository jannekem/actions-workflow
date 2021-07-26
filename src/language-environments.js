const languageEnvironments = [
  "Node",
  "Python",
  "Java",
  "Go",
 // ".NET",
 // "Ruby",
 // "Elixir",
 // "Haskell",
];

const languageEnvironmentConf = {
  Node: {
    uses: "actions/setup-node@v2",
    with: [
      {
        type: "input",
        name: "node-version",
        message: "Choose Node version",
      },
      {
        type: "list",
        name: "cache",
        message: "Cache dependencies?",
        choices: ["no cache", "npm", "yarn", "pnpm"],
        skip_option: "no cache",
      },
    ],
  },
  Python: {
    uses: "actions/setup-python@v2",
    with: [
      {
        type: "input",
        name: "python-version",
        message: "Choose Python version (optional)",
      },
      {
        type: "list",
        name: "architecture",
        message: "Target architecture of the Python interpreter",
        choices: ["default", "x86", "x64"],
        skip_option: "default",
      },
    ],
  },
  Java: {
    uses: "actions/setup-java@v2",
    with: [
      {
        type: "input",
        name: "java-version",
        message: "Choose Java version",
        required: true,
      },
      {
        type: "list",
        name: "distribution",
        message: "Choose distribution",
        required: true,
        choices: ["zulu", "adopt", "adopt-hotspot", "adopt-openj9"],
      },
    ],
  },
  Go: {
    uses: "actions/setup-go@v2",
    with: [
      {
        type: "input",
        name: "go-version",
        message: "Choose Go version (optional)",
      },
      {
        type: "list",
        name: "stable",
        message: "Download only stable Go versions?",
        choices: ["default (yes)", "yes", "no"],
        skip_option: "default (yes)",
      },
    ],
  },
};

export { languageEnvironments, languageEnvironmentConf };

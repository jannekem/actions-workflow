import YAML from "yaml";

function buildYaml(baseAnswers, jobAnswers) {
  const workflow = {
    name: baseAnswers.name,
    on: baseAnswers.on,
    jobs: {},
  };

  for (const [jobId, jobData] of Object.entries(jobAnswers.jobs)) {
    const jobOptions = jobAnswers["job-options"][jobId];
    const job = {};

    // depend
    if (jobData.needs) {
      job.needs = jobData.needs;
    }

    // runs-on
    if (jobData["runs-on"].matrix) {
      job["runs-on"] = "${{ matrix.os }}";
      job.strategy = {
        matrix: {
          os: jobData["runs-on"].os,
        },
      };
    } else {
      job["runs-on"] = jobData["runs-on"].os;
    }

    // name
    if (jobData.name) {
      job.name = jobData.name;
    }

    // steps
    job.steps = [];
    if (jobOptions.checkout) {
      job.steps.push({
        uses: "actions/checkout@v2",
      });
    }
    if (jobOptions.languages) {
      for (const [uses, options] of Object.entries(jobOptions.languages)) {
        const stepArguments = {
          uses,
        };
        if (JSON.stringify(options.with) !== "{}") {
          stepArguments.with = options.with;
        }
        job.steps.push(stepArguments);
      }
    }

    workflow.jobs[jobId] = job;
  }

  // transform to JSON in order to lose 'undefined' entries
  const cleanObject = JSON.parse(JSON.stringify(workflow, null, "  "));
  console.log(YAML.stringify(cleanObject).replaceAll(" {}", ""));
}

export { buildYaml };

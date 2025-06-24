import {getGitLogs} from "./gitUtils.js";
import {generateReport} from "./generateReport.js";

const commits = await getGitLogs()

if (commits.length === 0) {
    process.exit(0);
}

generateReport(commits)


import simpleGit from 'simple-git';
const git = simpleGit('your-project-path');

export async function getGitLogs(since = '--since="1 day ago') {
    const logs = await git.log([since]);
    return logs.all.map(entry =>`- ${entry.message}`).join('\n');
};

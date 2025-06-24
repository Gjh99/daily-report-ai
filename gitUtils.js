import simpleGit from 'simple-git';
const git = simpleGit('your-project-path');
/*
* git log --since="monday"  从周一开始
* git log --since="1 month ago" 从这个月开始
* */
export async function getGitLogs(since = '--since="1 day ago') {
    const logs = await git.log([since]);
    return logs.all.map(entry =>`- ${entry.message}`).join('\n');
};

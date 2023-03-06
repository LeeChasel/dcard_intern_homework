const OWNER = "LeeChasel";
let REPO = "dcard_intern_homework";

interface FormContent
{
    state: string;
    title: string;
    body: string;
    user: FormUser;
}
interface FormComment 
{
    id: string;
    body: string;
    user: FormUser;
}
interface FormUser
{
    login: string;
    avatar_url: string;
}

export function getUsername(token:string): Promise<string>
{
    return fetch("https://api.github.com/user", {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
    }}).then(res => res.json()).then(json => json.login);
}

export function getIssueContent(token:string, issue_number:string): Promise<FormContent>
{
    return fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${issue_number}`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(res => res.json())
}

export function getComments(token:string, issue_number:string): Promise<FormComment[]>
{
    return fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${issue_number}/comments`,{
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
        cache: "no-cache"
    }).then(res => res.json())
}

export function createComment(comment:any, issue_number:string, token:string)
{
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/${issue_number}/comments`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
        method: "POST",
        body: JSON.stringify(comment),
    }).catch(err => console.log(err));   
}

export function updateComment(comment:any, id:string, token:string)
{
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/comments/${id}`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
        method: "PATCH",
        body: JSON.stringify(comment),
    }).catch(err => console.log(err));
}

export function deleteComment(token:string, id:string)
{
    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/issues/comments/${id}`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
        method: "DELETE",
    }).catch(err => console.log(err));
}

export function getLebelsInRepo(token:string)
{
    return fetch(`https://api.github.com/repos/${OWNER}/${REPO}/labels`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
    }).then(res => res.json()).catch(err => console.log(err));
}

export function createIssue(token:string)
{

}
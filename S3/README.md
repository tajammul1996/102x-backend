someurl.com/create-post ---> Create a post --- done
someurl.com/update-post ---> Edit / Update post -- DONE
someurl.com/delete-post ---> Delete post
somerurl.com/get-posts ----> get a list of posts - done

user-resources

BASEURL/ENDPOINT
GET someurl.com/posts
POST someurl.com/posts
DELTE someurl.com/posts
PATCH someurl.com/posts
PUT someurl.com/posts

PATCH someurl.com/profiles, { name: 'Salman' }
{   
    id: "sdf-234-sdf",
    name: "Salman",
    company: 'udaan', 
}

PUT someurl.com/profiles, { name: 'TAJAMMUL', COMPANY: "INNOVACCER' }
{   
    id: "sdf-234-sdf",
    name: "TAJAMMUL",
    company: 'INNOVACCER', 
}



-----todo application-----
BASE_URL - https://www.awesometodo.com/api/v1
END_POINT - todos

prefix + version
/todos
https://www.awesometodo.com/api/v2/todos

GET {{BASE_URL}}/{{END_POINT}} - LIST OF TODOS
{
    data: {
        todos: [
            {
                id: '234-sdf',
                title: "first task",
                isCompleted: false
            },
            {
                id: '234-sdf',
                title: "first task",
                isCompleted: false
            }
        ]
    }
}

POST {{BASE_URL}}/{{END_POINT}} - CREATE A NEW TODO
PATCH {{BASE_URL}}/{{END_POINT}} - UPDATE A TODO
DELTE {{BASE_URL}}/{{END_POINT}} - DELETE A TODO


someurl.com/api/v1/todos?search=hello
someurl.com/api/v1/profiles
someurl.com/api/v1/orders

{
    success: true,
    error: null
    code: 400,
    data: {
        todos: []
    }
}

res.status(200).send()

{
    success: false,
    error: "user id is not correct"
    code: 400,
    data: null
}


/version 
{
    version: 2.3.4
}
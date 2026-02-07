enum Status
{
    Pending ,
    Completed
}

class Task
{
    title : string
    due   : Date
    state : Status

    constructor( title:string , due:Date )
    {
        this.title = title
        this.due   = due
        this.state = Status.Pending
    }

    toggle( ) : void
    {
        this.state =
        this.state === Status.Pending
        ? Status.Completed
        : Status.Pending
    }
}

let tasks : Task[] = []

function addTask( ) : void
{
    let nameInput = document.getElementById("tname") as HTMLInputElement
    let dateInput = document.getElementById("tdate") as HTMLInputElement

    if( nameInput.value === "" || dateInput.value === "" ) return

    let t = new Task(
        nameInput.value ,
        new Date( dateInput.value )
    )

    tasks.push( t )

    tasks.sort(
        (a,b)=> a.due.getTime() - b.due.getTime()
    )

    nameInput.value = ""
    dateInput.value = ""

    showTasks( )
}

function showTasks( ) : void
{
    let ul = document.getElementById("list") as HTMLUListElement
    ul.innerHTML = ""

    tasks.forEach( (t,index)=>{

        let li = document.createElement("li")

        let span = document.createElement("span")
        span.innerText =
        t.title + " (" + t.due.toDateString() + ")"

        if( t.state === Status.Completed )
            span.className = "done"

        span.onclick = ()=> {
            t.toggle()
            showTasks()
        }

        let del = document.createElement("button")
        del.innerText = "X"
        del.onclick = ()=> {
            tasks.splice(index,1)
            showTasks()
        }

        li.appendChild(span)
        li.appendChild(del)

        ul.appendChild(li)

    })
}

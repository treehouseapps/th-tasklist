const leftList = document.getElementById('left-list')
const tasklist = document.getElementById('tasklist')
const addTaskBtn = document.getElementById('addTaskBtn')
const projectNumber = document.getElementById('projectNumber')
const projectName = document.getElementById('projectName')
const projectTask = document.getElementById('projectTask')
const taskName = document.getElementById('taskName')
const pModal = document.getElementById('pModal')
const tModal = document.getElementById('tModal')
const x = document.getElementById('x')

let val = 0


const projects = [
    { id: 1, title: 'Extreme' },
    { id: 2, title: 'World Wide' }]


projectNumber.value = projects.length + 1

const array = [
    {
        data: [
            'Lorem ipsum dolor sit amet',
            'consectetuer adipiscing elit',
            'Maecenas porttitor congue massa'
        ]
    },
    {
        data: [
            'Donec ut est in lectus consequat consequat',
            'Aliquam erat volutpat',
            'Sed at lorem in nunc porta tristique'
        ]
    }
]

const addproject = () => {
    if (projectName.value == '' || projectTask.value == '') { return }
    projects.push({ id: parseInt(projectNumber.value), title: projectName.value })
    array.push({
        data: [`${projectTask.value}`]
    })
    list()
    closeModal()
}
const submitTask = () => {
    if (taskName.value == '') { return }
    array[val - 1].data.push(taskName.value)
    displayList(array[val - 1].data)
    closeModal()
}

if (val == 0) {
    tasklist.innerHTML = `<div class="empty">No Task !</div>`
    addTaskBtn.style.display = 'none'
}

const select = (item) => {
    displayList(array[item - 1].data)
    val = item
}

const list = () => {
    leftList.innerHTML = ''
    projects.forEach((project) => {
        const p = document.createElement('p')
        p.innerHTML = `<div  onclick="select(${project.id})">${project.title}</div>`
        leftList.appendChild(p)
    })
}
list()

const displayList = (current) => {
    tasklist.innerHTML = ''
    addTaskBtn.style.display = 'block'
    current.forEach((task) => {
        const div = document.createElement('div')
        div.className = 'task'
        div.innerHTML = `
    <p>${task}</p>
    <button>Mark</button>
    `
        tasklist.appendChild(div)
    })

}
const openPmodal = () => {
    pModal.style.display = 'grid'
}
const openTmodal = () => {
    tModal.style.display = 'grid'
}
const closeModal = () => {
    projectName.value = ''
    projectTask.value = ''
    taskName.value = ''
    tModal.style.display = 'none'
    pModal.style.display = 'none'
}
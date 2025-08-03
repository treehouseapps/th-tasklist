const leftList = document.getElementById('left-list')
const tasklist = document.getElementById('tasklist')
const addTaskBtn = document.getElementById('addTaskBtn')
const projectNumber = document.getElementById('projectNumber')
const projectName = document.getElementById('projectName')
const projectTask = document.getElementById('projectTask')
const taskName = document.getElementById('taskName')
const pModal = document.getElementById('pModal')
const tModal = document.getElementById('tModal')

let val = 0

const projects = JSON.parse(localStorage.getItem('projects')) || [
    { id: 1, title: 'Extreme' },
    { id: 2, title: 'World Wide' }]

const array = JSON.parse(localStorage.getItem('tasks')) || [
    {
        data: [
            { text: 'Lorem ipsum dolor sit amet', marked: false },
            { text: 'consectetuer adipiscing elit', marked: true },
            { text: 'Maecenas porttitor congue massa', marked: true }
        ]
    },
    {
        data: [
            { text: 'Donec ut est in lectus consequat consequat', marked: true },
            { text: 'Aliquam erat volutpat', marked: true },
            { text: 'Sed at lorem in nunc porta tristique', marked: true },
        ]
    }
]

const addproject = () => {
    if (projectName.value == '' || projectTask.value == '') { return }
    projects.push({ id: parseInt(projectNumber.value), title: projectName.value })
    array.push({
        data: [{ text: projectTask.value, marked: true }]
    })
    list()
    closeModal()
    saveToStorage()
}
const submitTask = () => {
    if (taskName.value == '') { return }
    array[val - 1].data.push({ text: taskName.value, marked: true })
    displayList(array[val - 1].data)
    closeModal()
    saveToStorage()
}

const saveToStorage = () => {
    localStorage.setItem('projects', JSON.stringify(projects))
    localStorage.setItem('tasks', JSON.stringify(array))
}

if (val === 0) {
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
        p.innerHTML = `<div class="tasks"
        onclick="select(${project.id})">
        ${project.title}</div>
        <div class="x"
        onclick="deleteProject(${project.id})">X</div>`
        leftList.appendChild(p)
    })
}

list()

const displayList = (current) => {
    tasklist.innerHTML = ''
    addTaskBtn.style.display = 'block'
    current.forEach((task, index) => {
        const div = document.createElement('div')
        div.className = 'task'

        const markedClass = task.marked ? 'marked' : ''

        div.innerHTML = `
            <p class="${markedClass}">${task.text}</p>
    <div>
    <button onclick="markTask(${index})">Mark</button> 
    <button class="x" onclick="deleteTask(${index})">X</button></div>
    `
        tasklist.appendChild(div)
    })

}
const openPmodal = () => {
    projectNumber.value = projects.length + 1
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
const deleteProject = (id) => {
    const confirm = prompt('press 1 for Yes and 0 for No')
    if (confirm === '1') {
        projects.splice(id - 1, 1)
        saveToStorage()
        list()
    }
}

const deleteTask = (index) => {
    const confirm = prompt('press 1 for Yes and 0 for No')
    if (confirm === '1') {
        array[val - 1].data.splice(index, 1)
        console.log()
        saveToStorage()
        displayList(array[val - 1].data)
    }

}
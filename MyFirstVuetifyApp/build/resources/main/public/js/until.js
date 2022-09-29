(function () { // make vuetify dialogs movable
    const d = {};
    document.addEventListener("mousedown", e => {
        const dlg = e.target
        const closestDialog = dlg.closest(".v-dialog.v-dialog--active")
        if (e.button === 0 && closestDialog != null && (dlg.classList.contains("v-card__title") || dlg.classList.contains("v-toolbar__content"))) { // element which can be used to move element
            d.el = closestDialog; // element which should be moved
            d.mouseStartX = e.clientX
            d.mouseStartY = e.clientY
            d.elStartX = d.el.getBoundingClientRect().left
            d.elStartY = d.el.getBoundingClientRect().top
            d.el.style.position = "fixed"
            d.el.style.margin = 0
            d.oldTransition = d.el.style.transition
            d.el.style.transition = "none"
        }
    })
    document.addEventListener("mousemove", e => {
        if (d.el === undefined) return
        d.el.style.left = Math.min(
            Math.max(d.elStartX + e.clientX - d.mouseStartX, 0),
            window.innerWidth - d.el.getBoundingClientRect().width
        ) + "px"
        d.el.style.top = Math.min(
            Math.max(d.elStartY + e.clientY - d.mouseStartY, 0),
            window.innerHeight - d.el.getBoundingClientRect().height
        ) + "px"
    });
    document.addEventListener("mouseup", () => {
        if (d.el === undefined) return
        d.el.style.transition = d.oldTransition
        d.el = undefined
    })
    setInterval(() => { // prevent out of bounds
        const dialog = document.querySelector(".v-dialog.v-dialog--active")
        if (dialog === null) return
        dialog.style.left = Math.min(parseInt(dialog.style.left), window.innerWidth - dialog.getBoundingClientRect().width) + "px"
        dialog.style.top = Math.min(parseInt(dialog.style.top), window.innerHeight - dialog.getBoundingClientRect().height) + "px"
    }, 100)
})()
// Spanish collator
Vue.prototype.$collator = new Intl.Collator('es')
// Fetch Text or JSON objects
Vue.prototype.$fetch = async (input, init) => {
    const response = await fetch(input, init)
    if (!response.ok) {
        //const err = await response.json()
        //err.REQUEST_BODY[0].message
        throw Error(await response.text())
    }
    const contentType = response.headers.get("content-type")
    return contentType.includes("text/plain")
        ? await response.text()
        : await response.json()
}
// Fetch and image as blob
Vue.prototype.$fetchImage = async (input, init) => {
    const response = await fetch(input, init)
    if (!response.ok) throw Error(await response.text())
    return URL.createObjectURL(await response.blob())
}
//
Vue.prototype.$toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (evtToast) => {
        evtToast.addEventListener('mouseenter', Swal.stopTimer)
        evtToast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
//
Vue.prototype.$showError = (title, text) => {
    Swal.fire({ icon: 'error', title: title, text: text })
}
//
Vue.prototype.$swalConfirm = async (title, icon) => {
    return await Swal.fire({
        title: title,
        icon: icon,
        showCancelButton: true,
        //html: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar'
    })
}
//
// Export Excel/CSV
Vue.prototype.$objectToCSV = data => {
    const csvRows = []
    const headers = Object.keys(data[0])
    csvRows.push(headers.join(','))
    for (const row of data) {
        const values = headers.map(header => {
            const escaped = (''+row[header]).normalize('NFD').replace(/[\u0300-\u036f]/g,"")
            return `"${escaped}"`
        })
        csvRows.push(values)
    }
    return csvRows.join('\n')
}

Vue.prototype.$downloadCSV = data => {
    const blob = new Blob([data], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    //a.setAttribute('hidden', '')
    a.setAttribute('href', url)
    a.setAttribute('download', 'Reporte-General-DAT.csv')
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
}
//
//
Vue.prototype.$ddMMyyFormat = (strDate) => {
	const arr = strDate.split('-')
	return `${arr[2]}/${arr[1]}/${arr[0]}`
}
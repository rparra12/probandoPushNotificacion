console.log("Desde SW");

self.addEventListener('push', e => {
    const data = e.data.json();
    
    console.log(data)

    self.registration.showNotification(data.title, {
        body: data.message,
        icon: 'https://seeklogo.com/images/T/telefonica-new-2021-logo-62010F5D38-seeklogo.com.png'
    })

})
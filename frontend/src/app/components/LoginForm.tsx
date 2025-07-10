'use client'

export default function LoginForm() {
    const add = async () => {
        const res = await fetch('http://localhost:8000/api/sensors/', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: "example1", location: "location1" })
        })

        const data = await res.json()
        console.log('result', data)
    }

    return (<div><button onClick={add}>Test</button></div>)
}
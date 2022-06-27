function App() {
    const get = async () => {
        const res = await fetch("http://localhost:8000");
        console.log(res);
    };
    get();

    return (
        <div>
            hello
            <div className="trash_icon"></div>
        </div>
    );
}

export default App;

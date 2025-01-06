import { useState } from "react";
import "./App.css";
import { images } from "./data";
function App() {
    const [img, setImg] = useState(null);
    function handleImageClick(img) {
        setImg(img);
    }
    return (
        <div className="flex items-center flex-col w-full mt-8">
            <div className="w-[800px] flex flex-col items-center space-y-6">
                <div className="">Click on an image!</div>
                <div className="flex">
                    {images.map((img, index) => (
                        <div
                            key={index} // Add a key prop to avoid React warnings
                            onClick={() => handleImageClick(img)}
                            className="mx-4 h-44 w-44 rounded-xl shadow-md shadow-slate-400 transform transition-transform duration-300 hover:scale-110"
                        >
                            <img
                                src={img}
                                className="w-full h-full rounded-xl object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
            {img ? (
                <div className="my-4">
                    <p className="text-center text-xl">Selected Image</p>
                    <div className="w-72 h-60  shadow-xl rounded-xl  shadow-slate-600">
                        <img
                            className="w-full h-full object-cover rounded-xl "
                            src={img}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}

export default App;

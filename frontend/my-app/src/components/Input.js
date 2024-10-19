


export function Input({type,Svg,placeholder,onChange}){
    return (
        <div className="relative inline-block">
            <input
                type={type}
                className="ml-7 bg-[#F4F4F4] text-lg px-10 py-4 w-4/5 border border-gray-300 rounded"
                placeholder={placeholder}
                onChange={onChange}
            />
            <Svg
                className="ml-7 absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5" // Adjust size as needed
            />
        </div>
    );
}
export default function SignUpComp() {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <div className="flex flex-col items-center justify-center bg-white shadow-md rounded-lg p-8 w-96">
                <h1 className="text-2xl font-bold font-heading">Sign Up</h1>
                <form className="flex flex-col w-full mt-4">
                    <label className="text-sm font-semibold font-heading" htmlFor="email">Email</label>
                    <input className="border border-gray-300 rounded-lg px-3 py-2 mt-1" type="email" id="email" name="email" required />
                    <label className="text-sm font-semibold font-heading mt-4" htmlFor="password">Password</label>
                    <input className="border border-gray-300 rounded-lg px-3 py-2 mt-1" type="password" id="password" name="password" required />
                    <label className="text-sm font-semibold font-heading mt-4" htmlFor="confirmPassword">Confirm Password</label>
                    <input className="border border-gray-300 rounded-lg px-3 py-2 mt-1" type="password" id="confirmPassword" name="confirmPassword" required />
                    <button className="bg-gray-900 text-white font-semibold font-heading rounded-lg px-3 py-2 mt-4" type="submit">Sign Up</button>
                </form>
            </div>
        </div>
    )
}
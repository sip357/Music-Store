export default function SignIn() {
  return (
      <div className="overflow-y-auto h-auto w-full">
        <div className="pt-7 mx-auto text-center font-bold text-6xl p-1">Sign In</div>
        <form action="submit" className="mx-auto">
            <label htmlFor="">Email:</label>
            <input type="text"/>
        </form>
      </div>
  );
}
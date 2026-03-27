import Hello from "@/components/Hello";
import Counter from "@/components/Counter";

export default function Home() {
  return (
    <div>
      <h2> React Next.js Application</h2>
      <Hello message="Hello React" color="blue"/>
      {/* <Hello message="Hello Next.js" color="red"/> */}
      <Counter count = {5} />
    </div>
  );
}

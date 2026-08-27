import {prisma} from @/lib/prisma;
export default async function Page(){const data=await prisma.category.findMany({include:{products:true}});return <main className=container><h1>Jantinha do Rogerio</h1>{data.map(x=><section key={x.id}><h2>{x.name}</h2>{x.products.map(p=><p key={p.id}>{p.name}</p>)}</section>)}</main>}

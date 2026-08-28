import {PrismaClient} from "@prisma/client";
import slugify from "slugify";

const prisma=new PrismaClient();
type Item={name:string;price:number};
type Section={name:string;order:number;items:Item[]};
const same=(price:number,names:string[]):Item[]=>names.map(name=>({name,price}));

const sections:Section[]=[
  {name:"Espetinhos",order:10,items:[
    ...same(15,["Contra Filé","Frango com Bacon","Almôndega com Queijo","Almôndega com Bacon","Asinha","Coxinha de Frango","Coração","Linguiça de Frango","Linguiça Suína"]),
    {name:"Lombo Suíno",price:16},...same(15,["Cupim","Picanha","Filé Recheado","Queijo Coalho","Queijo com Bacon","Provolone"]),
    {name:"Pão de Alho",price:8},{name:"Calabresa",price:15},{name:"Fraldinha",price:17},{name:"Angus",price:20},{name:"Costela de Vaca",price:16},{name:"Filé de Tilápia",price:17},{name:"Romeu e Julieta",price:16}
  ]},
  {name:"Espetos Especiais",order:20,items:[{name:"Picanha",price:25},{name:"Cupim",price:25}]},
  {name:"Jantinhas",order:30,items:[{name:"Jantinha sem Espeto",price:13}]},
  {name:"Guarnições",order:40,items:[
    {name:"Arroz - Pequeno",price:12},{name:"Arroz - Grande",price:15},{name:"Feijão Tropeiro - Pequeno",price:12},{name:"Feijão Tropeiro - Grande",price:15},{name:"Feijão de Caldo - Pequeno",price:12},{name:"Feijão de Caldo - Grande",price:15},{name:"Vinagrete",price:7}
  ]},
  {name:"Caldos",order:50,items:[...same(20,["Caldo de Frango","Caldo de Mocotó","Caldo de Costela","Caldo de Feijão"])]},
  {name:"Porções",order:60,items:[
    ...same(80,["Picanha Acebolada","Fraldinha Acebolada"]),{name:"Batata Completa (Queijo e Bacon)",price:35},{name:"Batata Simples",price:25},{name:"Frango a Passarinho",price:60},{name:"Torresmo",price:20},{name:"Tábua de Frios",price:55},{name:"Calabresa Fina",price:50},...same(20,["Salsicha Palito","Ovo de Codorna"]),{name:"Filé de Tilápia",price:60},{name:"Costela de Tilápia",price:55},{name:"Costela de Caranha",price:50},{name:"Lambari",price:50},...same(70,["Ceviche","Camarão"]),...same(50,["Bolinho de Arroz","Mini Almôndegas"])
  ]},
  {name:"Saladas",order:70,items:[...same(30,["Salada Caesar","Salada Cremosa"])]},
  {name:"Massas",order:80,items:[
    {name:"Pizza Moda - Mini",price:20},{name:"Pizza Moda - Média",price:50},{name:"Pizza Moda - Grande",price:60},{name:"Pizza Calabresa - Mini",price:20},{name:"Pizza Calabresa - Média",price:50},{name:"Pizza Calabresa - Grande",price:60}
  ]},
  {name:"Macarrão",order:90,items:[...same(30,["Macarrão à Bolonhesa","Macarrão Alho e Óleo","Macarrão 4 Queijos","Macarrão ao Molho Branco","Macarrão ao Molho Vermelho"])]},
  {name:"Bebidas",order:100,items:[
    ...same(15,["Suco de Laranja","Suco de Maracujá","Suco de Tamarindo","Suco de Abacaxi","Suco de Abacaxi com Hortelã","Suco de Caju","Suco de Morango","Suco de Acerola","Suco de Goiaba","Suco de Cupuaçu"]),
    {name:"Creme",price:17},{name:"Del Valle 1 Litro",price:14},{name:"Del Valle Kapo",price:4},{name:"Del Valle Lata",price:8},
    {name:"Skol 600 ml",price:13},{name:"Sol 600 ml",price:16},{name:"Heineken 600 ml",price:17},{name:"Amstel 600 ml",price:13},{name:"Budweiser 600 ml",price:14},{name:"Stella 600 ml",price:14},{name:"Brahma Chopp 600 ml",price:13},{name:"Spaten 600 ml",price:14},{name:"Antarctica Boa 600 ml",price:13},{name:"Antarctica Original 600 ml",price:13},{name:"Corona 600 ml",price:17},
    ...same(16,["Skol 1 Litro","Budweiser 1 Litro","Brahma Chopp 1 Litro","Antarctica Boa 1 Litro","Antarctica Original 1 Litro"]),
    ...same(5,["Skol Lata","Amstel Lata","Brahma Chopp Lata","Antarctica Original Lata"]),{name:"Heineken Lata",price:7},{name:"Antarctica Boa Lata",price:6},{name:"Budweiser Lata",price:7},{name:"Stella Lata",price:7},
    ...same(10,["Stella Long Neck","Heineken Long Neck","Sol Long Neck","Amstel Long Neck","Budweiser Long Neck","Budweiser Zero Long Neck","Corona Long Neck","Corona Zero Long Neck","Michelob Long Neck","Brahma Zero Long Neck","Skol Beats Long Neck"]),{name:"Spaten Long Neck",price:8},
    ...same(15,["Vinho Pérgola","Vinho Quinta do Morgado","Vinho de Morango"]),
    {name:"Cozmel",price:4},{name:"Caipirinha",price:15},{name:"Caipiroska",price:15},{name:"Batida",price:17},{name:"Caipirinha - Grande",price:45},{name:"Água com Gás",price:4},{name:"Água sem Gás",price:4},
    {name:"Dose de Tequila",price:15},{name:"Dose de Seleta",price:10},{name:"Dose de Presidente",price:5},{name:"Dose de Velho Barreiro",price:5},{name:"Dose de Pinga 51",price:5},{name:"Dose de Bananinha",price:10},{name:"Dose de Balena",price:20},{name:"Dose de Licor 43",price:20},{name:"Dose de Campari",price:18},{name:"Dose de Martini",price:10},{name:"Dose de Old Parr",price:20},{name:"Dose de Chivas",price:20},{name:"Dose de Ballantines",price:20},{name:"Dose de White Horse",price:15},
    ...same(6,["Coca-Cola Lata","Mineiro Lata","Fanta Lata","Coca-Cola Zero Lata","Pepsi Lata","Pepsi Black Lata","Sukita Lata","Água Tônica Lata","Antarctica Lata"]),{name:"Red Bull",price:15},
    ...same(8,["Coca-Cola 600 ml","Coca-Cola Zero 600 ml","Mineiro 600 ml","Fanta 600 ml","Antarctica 600 ml","Soda 600 ml","Pepsi 600 ml","H2O 600 ml"]),{name:"Gatorade",price:10},
    ...same(10,["Coca-Cola 1 Litro","Coca-Cola Zero 1 Litro","Fanta 1 Litro","Kuat 1 Litro","Pepsi 1 Litro","Antarctica 1 Litro","Soda 1 Litro"]),
    {name:"Coca-Cola 2 Litros",price:15},{name:"Coca-Cola Zero 2 Litros",price:15},{name:"Fanta 2 Litros",price:14},...same(10,["Mineiro 2 Litros","Kuat 2 Litros","Sukita 2 Litros","Pepsi 2 Litros","Antarctica 2 Litros"])
  ]}
];

async function main(){let created=0;for(const section of sections){const slug=slugify(section.name,{lower:true,strict:true});const category=await prisma.category.upsert({where:{slug},update:{name:section.name,order:section.order,active:true},create:{name:section.name,slug,order:section.order,active:true}});const existing=await prisma.product.findMany({where:{categoryId:category.id},select:{name:true,priceCents:true}});const keys=new Set(existing.map(item=>`${item.name}|${item.priceCents}`));const products=section.items.filter(item=>!keys.has(`${item.name}|${item.price*100}`)).map(item=>({name:item.name,description:"",priceCents:item.price*100,imageUrl:"",available:true,featured:false,categoryId:category.id}));if(products.length){await prisma.product.createMany({data:products});created+=products.length}console.log(`${section.name}: ${products.length} adicionados`)}console.log(`Total: ${created} produtos adicionados`)}

main().finally(()=>prisma.$disconnect());

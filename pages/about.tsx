// import Link from 'next/link'
import Image from 'next/image'
import Header from '../components/Header'

export default function About() {
  return (
    <>
    <Header />
     <div className = "">
       <Image src="/assets/myPic.png" alt="my-image"/>
       <div>
         <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos incidunt praesentium laudantium molestias molestiae corporis, magnam sint officiis accusamus saepe nemo qui minus enim distinctio quae assumenda officia, hic quis.lorem</p>
       </div>
     </div>
    </>
  )
}

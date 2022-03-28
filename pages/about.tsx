import Header from '../components/Header'

export default function About() {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-7xl text-center">
        <div className="">
          <img src="/mypic.jpg" alt="mypic" />
        </div>
        <div className="text-lg">
          <div>Abhay Kumar Mittal</div>
          <p>
            I am a passionate student who is pursuing my major in computer
            science at the National Institute of Technology Hamirpur, India. I
            enjoy solving technical problems, researching and developing new
            technologies, designing software applications for different
            platforms. I enjoy meeting people and working with them in a team
            environment. I have good experience in the field of Web development,
            where I have done various projects based on this which helps many
            people in their technical background. And currently, I am exploring
            the field of Machine Learning and Artificial Intelligence and
            working on different projects and research based on it.
          </p>
        </div>
      </div>
    </>
  )
}

import Header from '../components/Header'

export default function About() {
  return (
    <>
      <Header />
      <div className="mx-auto mt-16 flex max-w-7xl border-4 border-double border-blue-800 p-4 text-center drop-shadow-lg">
        <img src="/mypic.jpg" alt="mypic" width="400" />
        <div className="mx-16 content-center">
          <div className="font-serif text-6xl font-bold text-blue-800">
            Abhay Kumar Mittal
          </div>
          <p className="mt-8 font-serif text-2xl">
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

import React from 'react'

const data = [
  'Hi i am a novice web developer interested in becoming a full stack dev, but currently, I am learning front end. The projects I have worked on do not have any commercial purposes whatsoever. I simply aim to accumulate experience and enhance skills',
  'I write code for money'
]

const imageClass = 'rounded-circle w-25'

export default function Home() {
  return (
    <section className='container'>
      <div className='d-flex align-items-center gap-5 '>
        <img
          src="me.jpg"
          alt="me"
          className={imageClass}
        />
        <div className='d-flex flex-column gap-2 w-50'>
          <h1>About me</h1>
          <p className='lead'>{data[0]}</p>
          <figure>
            <blockquote class="blockquote">
              <p>" {data[1]} "</p>
            </blockquote>
            <figcaption class="blockquote-footer">
              Someone famous in <cite title="Source Title">around the world</cite>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  )
}

// export default function Promo() {
//   return (
//     <div className="relative bg-gray-800 py-32 px-6 sm:py-40 sm:px-12 lg:px-16">
//       <div className="absolute inset-0 overflow-hidden">
//         <img
//           src="https://tailwindui.com/img/ecommerce-images/home-page-03-feature-section-full-width.jpg"
//           alt=""
//           className="h-full w-full object-cover object-center"
//         />
//       </div>
//       <div
//         aria-hidden="true"
//         className="absolute inset-0 bg-gray-900 bg-opacity-50"
//       />
//       <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
//         <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
//           Long-term thinking
//         </h2>
//         <p className="mt-3 text-xl text-white">
//           We're committed to responsible, sustainable, and ethical
//           manufacturing. Our small-scale approach allows us to focus on quality
//           and reduce our impact. We're doing our best to delay the inevitable
//           heat-death of the universe.
//         </p>
//         <a
//           href="#"
//           className="mt-8 block w-full rounded-md border border-transparent bg-white py-3 px-8 text-base font-medium text-gray-900 hover:bg-gray-100 sm:w-auto"
//         >
//           Read our story
//         </a>
//       </div>
//     </div>
//   );
// }
const testimonials = [
  {
    id: 1,
    quote:
      "My order arrived super quickly. The product is even better than I hoped it would be. Very happy customer over here!",
    attribution: "Sarah Peters, New Orleans",
  },
  {
    id: 2,
    quote:
      "I had to return a purchase that didn’t fit. The whole process was so simple that I ended up ordering two new items!",
    attribution: "Kelly McPherson, Chicago",
  },
  {
    id: 3,
    quote:
      "Now that I’m on holiday for the summer, I’ll probably order a few more shirts. It’s just so convenient, and I know the quality will always be there.",
    attribution: "Chris Paul, Phoenix",
  },
];

export default function Promo() {
  return (
    <div className="relative overflow-hidden my-10 bg-white">
      {/* Decorative background image and gradient */}
      <div aria-hidden="true" className="absolute inset-0">
        <div className="absolute inset-0 mx-auto max-w-7xl overflow-hidden xl:px-8">
          <img
            src="https://tailwindui.com/img/ecommerce-images/home-page-02-sale-full-width.jpg"
            alt=""
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="absolute inset-0 bg-white bg-opacity-75" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white" />
      </div>

      {/* Callout */}
      <section
        aria-labelledby="sale-heading"
        className="relative mx-auto flex max-w-7xl flex-col items-center px-4 pt-32 text-center sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2
            id="sale-heading"
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl"
          >
            Mark Mart E-commerce Platform
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-xl text-gray-600">
            An E-commerce platform to give our customers convinient shopping
            experience through enhanced user experience
          </p>
          {/* <a
            href="#"
            className="mt-6 mb-8 inline-block w-full rounded-md border border-transparent bg-gray-900 py-3 px-8 font-medium text-white hover:bg-gray-800 sm:w-auto"
          >
            Get access to our one-time sale
          </a> */}
        </div>
      </section>

      {/* Testimonials */}
      {/* <section
        aria-labelledby="testimonial-heading"
        className="relative mx-auto max-w-7xl py-24 px-4 sm:px-6 lg:py-32 lg:px-8"
      >
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <h2
            id="testimonial-heading"
            className="text-2xl font-bold tracking-tight text-gray-900"
          >
            What are people saying?
          </h2>

          <div className="mt-16 space-y-16 lg:grid lg:grid-cols-3 lg:gap-x-8 lg:space-y-0">
            {testimonials.map((testimonial) => (
              <blockquote key={testimonial.id} className="sm:flex lg:block">
                <svg
                  width={24}
                  height={18}
                  viewBox="0 0 24 18"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="flex-shrink-0 text-gray-300"
                >
                  <path
                    d="M0 18h8.7v-5.555c-.024-3.906 1.113-6.841 2.892-9.68L6.452 0C3.188 2.644-.026 7.86 0 12.469V18zm12.408 0h8.7v-5.555C21.083 8.539 22.22 5.604 24 2.765L18.859 0c-3.263 2.644-6.476 7.86-6.451 12.469V18z"
                    fill="currentColor"
                  />
                </svg>
                <div className="mt-8 sm:mt-0 sm:ml-6 lg:mt-10 lg:ml-0">
                  <p className="text-lg text-gray-600">{testimonial.quote}</p>
                  <cite className="mt-4 block font-semibold not-italic text-gray-900">
                    {testimonial.attribution}
                  </cite>
                </div>
              </blockquote>
            ))}
          </div>
        </div>
      </section> */}
    </div>
  );
}

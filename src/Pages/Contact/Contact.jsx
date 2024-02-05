import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const Contact = () => {

    const axiosPublic = useAxiosPublic();

    const handleContactSubmit = e =>{
        e.preventDefault();
        const form = e.target;
        const firstName = form.firstName.value;
        const lastName = form.lastName.value;
        const email = form.email.value;
        const phone = form.phone.value;
        const message = form.message.value;

        const contactInfo = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            message: message,
        }

        console.log(contactInfo);
        axiosPublic.post('/contacts', contactInfo)
        .then(res =>{
            console.log(res.data);
            if(res.data.insertedId){
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: `Thanks for for your feedback`,
                    showConfirmButton: false,
                    timer: 2500,
                  });
                form.reset();
            }
        })

    }
  return (
    <div>


      <div className="flex justify-center items-center bg-white font-workSans">
        {/* <!-- COMPONENT CODE --> */}
        <div className="container mx-auto my-4 px-4 lg:px-20">
          <div className="w-full p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
            <div className="flex">
              <h1 className="font-bold uppercase text-5xl">
                Send us a <br /> message
              </h1>
            </div>
            <form onSubmit={handleContactSubmit}>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="First Name*"
                name="firstName"
                required
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="text"
                placeholder="Last Name*"
                name="lastName"
                required
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="email"
                placeholder="Email*"
                required
                name="email"
              />
              <input
                className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                type="number"
                placeholder="Phone*"
                name="phone"
                required
              />
            </div>
            <div className="my-4">
              <textarea
                placeholder="Message*"
                name="message"
                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <div className="my-2 w-1/2 lg:w-1/4">
              <input type="submit" value="Send Message"
                className=" bg-slate-800 text-gray-100 py-3 px-4 rounded-lg cursor-pointer" />
            </div>
            </form>
          </div>

          <div className="w-full lg:-mt-[450px] lg:w-2/6 px-8 py-12 ml-auto bg-slate-800 rounded-2xl">
            <div className="flex flex-col text-white">
              <h1 className="font-bold uppercase text-4xl my-4">
                Drop in our office
              </h1>
              <p className="text-gray-400">
              If you would like to drop in and speak with us about your case, please call our office at (+880) 1683988686. We are located in the heart of Noakhali, near Grand Central Station.
              </p>

              
              
                <div className="flex flex-col w-full my-6 ">
                  <h2 className="text-2xl py-2 ">Main Office</h2>
                  <p className="text-gray-400">
                  Engineer Tower (1st Floor), 
                  <p>1255/1, Engineer Road, </p>
                  <p>Maijdee, Noakhali, BD</p>
                  </p>
                </div>
              

              
            </div>
          </div>
        </div>
        {/* <!-- COMPONENT CODE --> */}
      </div>
    </div>
  );
};

export default Contact;

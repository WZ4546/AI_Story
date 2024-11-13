const QuoraLayout = () => {
  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-gray-200">
        <div className="flex items-center">
          <div className="font-bold text-lg">Quora</div>
          <input 
            type="text" 
            placeholder="What do you want to ask or share?" 
            className="ml-4 p-2 border border-gray-300 rounded"
          />
        </div>
        <div>
          <button className="bg-red-500 text-white px-4 py-2 rounded">Add Question</button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex mt-4">
        {/* Left Sidebar */}
        <div className="w-1/4 p-4 bg-gray-100">
          <ul>
            <li className="mb-2">Math Questions</li>
            <li className="mb-2">Android Apps</li>
            <li className="mb-2">Software Engineering</li>
            <li className="mb-2">The Science Space</li>
            <li className="mb-2">Fundamental Interactions</li>
            <li className="mb-2">Dark Psychology</li>
            <li className="mb-2">Human Behavior</li>
            <li className="mb-2">Australia</li>
          </ul>
        </div>

        {/* Main Feed */}
        <div className="w-1/2 p-4">
          {/* Post */}
          <div className="bg-white p-4 mb-4 rounded shadow">
            <div className="mb-2 text-gray-600">Anand Nyamdavaa • Worked in Development Field</div>
            <h2 className="font-bold text-xl mb-2">Why is national independence so important?</h2>
            <p className="mb-4">Consider my country Mongolia. It’s located between China and Russia...</p>
            <img 
              src="path_to_your_image.png" 
              alt="Map" 
              className="w-full h-auto mb-4"
            />
            <div className="flex items-center text-gray-500">
              <span className="mr-4">Upvote: 6.8K</span>
              <span className="mr-4">Comments: 287</span>
              <span>Share: 42</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-1/4 p-4">
          <div className="mb-4">
            <img 
              src="path_to_ad_image.png" 
              alt="Ad" 
              className="w-full h-auto mb-4"
            />
          </div>
          <div className="bg-white p-4 rounded shadow">
            <p>Karma: Where Amazon Savings Begin and Overpayments End!</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="p-4 bg-gray-200 mt-4">
        <div className="flex justify-between">
          <div>About • Careers • Terms • Privacy • Acceptable Use</div>
          <div>Advertise • Press • Your Ad Choices</div>
        </div>
      </footer>
    </div>
  );
};

export default QuoraLayout;

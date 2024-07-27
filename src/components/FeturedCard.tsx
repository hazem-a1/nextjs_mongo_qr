interface FeatureCardProps {
    title : string;
    description : string;
    icon : string; 
  }
  
  const FeatureCard: React.FC<FeatureCardProps> =({ title, description, icon }) => {
    return (
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="text-4xl mb-4">{icon}</div>
        <h2 className="text-2xl font-semibold mb-2 text-purple-400">{title}</h2>
        <p className="text-gray-300">{description}</p>
      </div>
    );
  }

  export default FeatureCard
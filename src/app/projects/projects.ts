export interface Project {
    id: number;
    title: string;
    category: string;
    imageUrl: string;
    description: string;
    features: string[];
    duration?: string;
    client?: string;
  }
  
  export const projectsData: Project[] = [
    { 
      id: 1, 
      title: 'Enterprise CRM Platform', 
      category: 'Web Application', 
      imageUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 
      description: 'A comprehensive CRM solution designed for large-scale enterprises to manage customer relations, sales pipelines, and marketing campaigns with unparalleled efficiency.', 
      features: ['React.js', 'Node.js', 'PostgreSQL', 'Data Analytics', 'CI/CD Pipeline'],
      duration: '6 months',
      client: 'Fortune 500 Company'
    },
    { 
      id: 2, 
      title: 'AI-Powered Analytics', 
      category: 'Data Science', 
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 
      description: 'An advanced analytics dashboard that uses machine learning to provide predictive insights and rich data visualizations for business intelligence.', 
      features: ['Python (Flask)', 'TensorFlow', 'Scikit-learn', 'D3.js', 'AWS SageMaker'],
      duration: '4 months',
      client: 'Tech Startup'
    },
    { 
      id: 3, 
      title: 'Mobile Banking App', 
      category: 'Mobile Application', 
      imageUrl: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 
      description: 'A secure and intuitive mobile banking application for iOS and Android, featuring biometric login, instant fund transfers, and bill payment services.', 
      features: ['React Native', 'Firebase', 'Biometric Auth', 'PCI Compliance', 'Java/Kotlin'],
      duration: '8 months',
      client: 'Regional Bank'
    },
    { 
      id: 4, 
      title: 'Corporate Branding & Website', 
      category: 'UI/UX Design & Development', 
      imageUrl: 'https://images.unsplash.com/photo-1587440871875-191322ee64b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', 
      description: 'Complete rebranding and a new corporate website for a major tech firm, focusing on modern UI/UX, accessibility (WCAG 2.1), and compelling brand story.', 
      features: ['Figma', 'Next.js', 'Contentful CMS', 'GSAP', 'WCAG 2.1'],
      duration: '3 months',
      client: 'Technology Firm'
    },
  ]; 
// const env = envConfig.environment;
// const config = envConfig.PA_service.admin[env];

class AicHelper {
  constructor() {}

  getAboutData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 'conversation',
          texts: [
            'Accion is a technology services firm 100% focused in the emerging technologies',
            'Our clients are technology firms and IT organizations who want to use emerging technologies',
            'such as Web 2.0, SaaS, cloud, open-source, mobility, BI / DW / big data, automation / DevOps to build innovative software.',
            'At Accion Labs, we believe in ‘Driving Outcomes Through Actions’.',
            ' With Accion, you are capable of not just bringing ground-breaking strategies, but also implementing them to life with the help of strong global ecosystem of consultants and engineers.'
          ]
        }
      ]
    };
    return response_object;
  }

  getShowMoreData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        // {
        //   type: 0,
        //   speech: 'What would you like to know about Acccionlabs?'
        // },
        {
          type: 'suggestion_chips',
          speech: 'What would you like to know about Acccionlabs?',
          suggestions: [
            {
              title: 'Solutions'
            },
            {
              title: 'Services'
            },
            {
              title: 'Blog'
            },
            {
              title: 'Company'
            },
            {
              title: 'Contact'
            }
          ]
        }
      ]
    };
    return response_object;
  }

  getCompanyData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        // {
        //   type: 0,
        //   speech: 'What would you like to know about Acccionlabs?'
        // },
        {
          type: 'suggestion_chips',
          speech: 'What else would you like to know about Acccionlabs?',
          suggestions: [
            {
              title: 'Why Accion Labs'
            },
            {
              title: 'The Accion Story'
            },
            {
              title: 'Leadership Team'
            },
            {
              title: 'About Our Talent'
            },
            {
              title: 'Our Clients'
            },
            {
              title: 'Alliances and Parterships'
            },
            {
              title: 'Corporate Social Responisibility'
            },
            {
              title: 'Accion Labs Locations'
            }
          ]
        }
      ]
    };
    return response_object;
  }

  getSolutionsData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: 'Some of the solutions that Accion provides include:'
        },
        {
          type: 'solutions_card',
          solutions: [
            {
              name: 'Web Application Development',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/solutions/ui-development-solutions.png'
            },
            {
              name: 'Cloud Computing Solutions',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/solutions/cloud-computing-solutions.png'
            },
            {
              name: 'Mobile Application Development',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/solutions/mobile-application-development.png'
            },
            {
              name: 'Product Engineering and Development',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/solutions/product-engeneering1-Custom-Custom.png'
            },
            {
              name: 'Big Data Consulting And Implementation Solutions',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/solutions/big-data-slide-Custom-Custom.png'
            },
            {
              name: 'Business Intelligence & Analytics Solutions',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/solutions/data-solution1-Custom-Custom.png'
            },
            {
              name: 'Open Source Solutions',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/solutions/Open_source-405x295-Custom.png'
            },
            {
              name: 'QA & Automation Solutions',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/solutions/Services-to-Start-up-and-Early-Stage-Firmsopt2-Custom.png'
            },
            {
              name: 'IT Service Management Solutions',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/solutions/Cloud_computing-400x295-Custom.png'
            }
          ]
        }
      ]
    };
    return response_object;
  }

  getServicesData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: 'Some of the services that Accion provides include:'
        },
        {
          type: 'services_card',
          services: [
            {
              name: 'Services For Growth Stage Tech Firms',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/services/matured-450x295-Custom.png'
            },
            {
              name: 'Services To Matured Technology Organizations',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/services/Services-For-Growth-Custom.png'
            },
            {
              name: 'For Start-Up And Early Stage Firms',
              desc: '',
              imageUrl:
                'http://accionlabs.com/images/services/startup_earlystage-453x295-Custom.png'
            }
          ]
        }
      ]
    };
    return response_object;
  }

  getBlogsData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: 'Here you go.'
        },
        {
          type: 'blogs',
          speech: ''
        }
      ]
    };
    return response_object;
  }

  getContactData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: 'Thank you for contacting AccionLabs'
        },
        {
          type: 'contact',
          speech: ''
        }
      ]
    };
    return response_object;
  }

  getWhyAccionData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 'suggestion_chips',
          speech: 'Are you a client or an employee?',
          suggestions: [
            {
              title: 'Client'
            },
            {
              title: 'Employee'
            }
          ]
        }
      ]
    };
    return response_object;
  }

  getClientData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: 'For Our Prospective Clients:'
        },
        {
          type: 'conversation',
          texts: [
            'We cover the entire innovation spectrum through full PDLC service',
            'We are unique in our ability to offer a mix of innovation consulting services and the full-lifecycle implementation services',
            'We have a global leadership team with strong hands-on experience and belief in outcome, action, life-long learning and work + life balance',
            'We offer a highly configurable Agile and tools-based software development methodology',
            'We understand the needs of tech firms – transparency, control, IP protection, cross-platform support, automation ,etc.',
            'We have high retention, high employee / client satisfaction'
          ]
        }
      ]
    };
    return response_object;
  }

  getEmpData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: 'For Our Prospective Employees:'
        },
        {
          type: 'conversation',
          texts: [
            'We offer you a great learning environment where you would work on cutting-edge, emerging technologies',
            'We allow you to pursue special IP/framework development projects, thought-leadership assignments, etc.',
            'We offer a global experience and support “cross-country” relocation between US, Europe, India, Singapore and Malaysia',
            'We offer a very competitive pay, performance-based bonus and stock-option plan',
            'You will work in an employee friendly environment with 100% focus on work-life balance, life-long learning and open communication',
            'We believe in a white-box execution model – i.e. we allow our employees to directly interact with clients – improving learning, communication and retention',
            'We invest in cross-training our resources across a range of emerging technologies – enabling you to develop more marketable skills'
          ]
        }
      ]
    };
    return response_object;
  }

  getStoryData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: "Here you go with a high-level timeline of Accion's evolution"
        },
        {
          type: 'conversation',
          texts: [
            'Jan 2011\n – Accion was founded in Pittsburgh PA with focus on PDLC services',
            'Sep 2011\n– Crossed 50 employee mark and becomes profitable',
            'Dec 2011\n– Expands into cloud and big data services',
            'Mar 2012\n – Crosses 100 employee mark',
            'Jul 2012\n – Opens up Atlanta offices',
            'Dec 2012\n– Establishes first oversees office in Bangalore, India',
            'Jun 2013\n– Setup its Singapore operation through acquisition of Hutranz Singapore Pte Ltd',
            'Aug 2013\n– Accion shortlisted as Top 20 Big Data service provider by CIO Review',
            'Dec 2013\n – Expands Big Data capabilities through acquisition of Reach1to1',
            'Jan 2014\n– Opens Malaysia office',
            'March 2014\n – Opens Santa Clara office and Enhances its Mobility offering through acquisition of Hibiscus',
            'May 2014\n– Opens London office',
            'Jul 2014\n – Acquires stake in Service-berry and establishes ITSM capabilities',
            'Aug 2014\n– Accion was awarded as Pittsburgh’s fastest growing tech services firm (#1 tech services, #3 overall)',
            'Sept 2015\n– Opens Goa office through acquisition of Parinati Solutions',
            'For more detailed story, visit\nhttp://accionlabs.com/company/the-accion-story/'
          ]
        }
      ]
    };
    return response_object;
  }

  getTalentData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: 'Accion has 600+ resources spread over 10 global locations'
        },
        {
          type: 'conversation',
          texts: [
            '95% of our resources have hands-on technical skills in programming',
            'Our average experience level within Accion is upwards of 5+ years – which is significantly higher than most large IT firms who tend higher younger less-experienced fresh talent',
            '95% of our resources have engineering or computer science background and about 40% have post-graduate degrees',
            '90% of our resources have prior experience working in an Agile methodology and at least half of them have strong exposure to TDD',
            'We focus on hiring resources with strong software engineering skills, particularly with strong fundamentals in network programming, threading, OOAD, web/distributed architectures, cross-platform development, automation, scripting, etc',
            'We have an attractive employee referral program. This enables us to hire from the network – improving the quality of our hires and limiting the potential of cultural mismatch.'
          ]
        }
      ]
    };
    return response_object;
  }

  getDefaultData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: "Sorry, I couldn't find anything for that"
        },
        {
          type: 'suggestion_chips',
          speech: 'What else would you like to know about Acccionlabs?',
          suggestions: [
            {
              title: 'Why Accion Labs'
            },
            {
              title: 'The Accion Story'
            },
            {
              title: 'Leadership Team'
            },
            {
              title: 'About Our Talent'
            },
            {
              title: 'Our Clients'
            },
            {
              title: 'Alliances and Parterships'
            },
            {
              title: 'Corporate Social Responisibility'
            },
            {
              title: 'Accion Labs Locations'
            }
          ]
        }
      ]
    };
    return response_object;
  }

  getAccionClientData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        // {
        //   type: 0,
        //   speech: 'What would you like to know about Acccionlabs?'
        // },
        {
          type: 'suggestion_chips',
          speech: "I've got a partial list of Accion's clients:",
          suggestions: [
            {
              title: 'Start-Up and Early-Stage Firms'
            },
            {
              title: 'Growth-Stage Firms'
            },
            {
              title: 'Matured Product/SAAS Firms'
            },
            {
              title: 'Enterprise IT Organizations'
            }
          ]
        }
      ]
    };
    return response_object;
  }

  getStartUpData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 'conversation',
          texts: [
            '1. A leading provider of talent management software for the returning US war veterans',
            '2. Developer of remote health-monitoring and care management software',
            '3. A SaaS-based retail analytic product provider for the leading US retailers',
            'among others...'
          ]
        }
      ]
    };
    return response_object;
  }

  createEnterpriseObject() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 'conversation',
          texts: [
            '1. A leading provider of technology solutions to the US defense industy',
            '2. A large supply-chain and logistics service provider to the US retail industry',
            '3. A leading producer of Consumer Packaged Goods in the pet food segment',
            'among others...'
          ]
        }
      ]
    };
    return response_object;
  }

  createMaturedObject() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 'conversation',
          texts: [
            '1. A leading provider of EAI and SOA platform software',
            '2. A leading provider of Search technology and archival software',
            '3. A leading provider of SaaS-based ITLM (IT Lifecycle Management) platform',
            'among others...'
          ]
        }
      ]
    };
    return response_object;
  }

  createGrowthObject() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 'conversation',
          texts: [
            '1. A leading provider of e-prescription software for the US health-care industry',
            '2. The provider of IP-video and TV technology and platform',
            '3. Developer of remote health-monitoring and care management software'
          ]
        }
      ]
    };
    return response_object;
  }

  getAlliancesData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech: 'Accion work with the following partners'
        },
        {
          type: 'alliances_card',
          alliances: [
            {
              name: 'KONY',
              desc:
                'Kony is a cloud based mobile application development platform. Kony allows businesses to design, develop, deploy and manage multiple applications from a single platform. Kony has been popular with developers that work on native mobile and web apps.',
              imageUrl: 'http://accionlabs.com/images/Kony_Logo_Apr_2016.png'
            },
            {
              name: 'DOCKER',
              desc:
                'Docker is a container as a service platform that helps DevOps teams build, ship and run applications from anywhere. It does this by allowing teams to create applications from micro services without any concerns for variability between the production and development environment of applications',
              imageUrl: 'http://accionlabs.com/images/docker.png'
            },
            {
              name: 'CHEF',
              desc:
                'Chef is an automation platform that converts complex infrastructure into code and thus brings it to life. Chef automates the way applications are deployed, configured and managed throughout the network.',
              imageUrl:
                'http://accionlabs.com/images/Chef_Software_Inc._company_logo.png'
            },
            {
              name: 'HORTONWORKS',
              desc:
                'Hortonworks is a software firm that focuses on open source Apache Hadoop. Hortonworks is known for its open source Data Platform, which is propelled by Apache Hadoop. The platform focuses on integrating existing data architectures to Apache Hadoop.',
              imageUrl: 'http://accionlabs.com/images/HortonWorks.png'
            },
            {
              name: 'MariaDB',
              desc:
                'MariaDB is one of the world’s most popular open source relational database. It is founded by the original creators of MySQL. MariaDB makes storage and querying from the database easy. Moreover, MariaDB also provides dynamic column support.',
              imageUrl:
                'http://accionlabs.com/images/MariaDB-sea_lion_copyright_blue_text.png'
            },
            {
              name: 'mongoDB',
              desc:
                'MongoDB is a No SQL document oriented database. The database is created using a collection of documents. Each collection contains multiple sets of documents that function as an equivalent of relational database tables. ',
              imageUrl:
                'http://accionlabs.com/images/MongoDB_Gray_Logo_FullColor_RGB-01.png'
            },
            {
              name: 'calm.io',
              desc:
                'Calm.io is an automation platform designed to manage modern data center environments such as hybrid-cloud infrastructures and micro service architectures. Calm.io can also work with existing workflow and configuration management tools as AWS and Azure.',
              imageUrl: 'http://accionlabs.com/images/calm_logo_rgb-copy.png'
            },
            {
              name: 'tori',
              desc:
                'TORI Global is a management consulting firm and are also trusted advisors to the world’s leading financial services companies. To deliver end-to-end digital realisation we have combined the advisory services of TORI Global with the development skills of Accionlabs.',
              imageUrl: 'http://accionlabs.com/images/tori_logo.png'
            }
          ]
        }
      ]
    };
    return response_object;
  }

  getLocationsData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech:
            'Accion Labs is venture-funded, privately-held with offices in multiple locations:'
        },
        {
          type: 'locations_card',
          locations: [
            {
              country: 'USA',
              cities: ['Pittsburgh']
            },
            {
              country: 'UK',
              cities: ['London']
            },
            {
              country: 'India',
              cities: [
                'Bangalore',
                'Mumbai',
                'Goa',
                'Pune',
                'Hyderabad',
                'Gurgaon'
              ]
            },
            {
              country: 'Singapore',
              cities: ['Singapore']
            },
            {
              country: 'Malaysia',
              cities: ['Kuala Lumpu']
            }
          ]
        }
      ]
    };
    return response_object;
  }

  getCorporateData() {
    let response_object = {
      speech: '',
      displayText: '',
      data: {
        expectUserResponse: false
      },
      messages: [
        {
          type: 0,
          speech:
            'In addition to the great learning environment, Accionlabs has a vibrant corporate social responsibility (CSR)'
        },
        {
          type: 'social_card',
          albums: [
            {
              title: 'Gift Giving Program For Underprivileged Children',
              images: [
                'http://accionlabs.com/images/company/WAF2_thumbnail.jpg',
                'http://accionlabs.com/images/company/WAF4_thumbnail.jpg',
                'http://accionlabs.com/images/company/WAF5_thumbnail.jpg',
                'http://accionlabs.com/images/company/WAF6_thumbnail.jpg',
                'http://accionlabs.com/images/company/WAF8_thumbnail.jpg',
                'http://accionlabs.com/images/company/WAF9_thumbnail.jpg'
              ]
            },
            {
              title: 'Relief Material For Chennai Floods',
              images: [
                'http://accionlabs.com/images/src/1.jpg',
                'http://accionlabs.com/images/src/2.jpg',
                'http://accionlabs.com/images/src/3.jpg',
                'http://accionlabs.com/images/src/4.jpg'
              ]
            },
            {
              title: 'Blood Donation Camp',
              images: [
                'http://accionlabs.com/images/src/5.jpg',
                'http://accionlabs.com/images/src/6.jpg',
                'http://accionlabs.com/images/src/7.jpg',
                'http://accionlabs.com/images/src/8.jpg'
              ]
            },
            {
              title: 'Contributions For Interactive Learning Solutions',
              images: [
                'http://accionlabs.com/images/src/9.jpg',
                'http://accionlabs.com/images/src/10.jpg',
                'http://accionlabs.com/images/src/11.jpg',
                'http://accionlabs.com/images/src/12.jpg',
                'http://accionlabs.com/images/src/13.jpg',
                'http://accionlabs.com/images/src/14.jpg'
              ]
            }
          ]
        }
      ]
    };
    return response_object;
  }
}

module.exports = AicHelper;

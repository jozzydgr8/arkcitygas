import { Col, Form, Input, Row, Typography } from 'antd';
import { InstagramOutlined, FacebookOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { FlatButton } from './FlatButton';
import { useState } from 'react';
import {  serviceValues } from '../data';
import { UseDataContext } from '../context/UseDataContext';
import { toast } from 'react-toastify';


const { Title, Paragraph } = Typography;

function Footer() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {product} = UseDataContext();

  const handleSubscribe = async()=>{
    setLoading(true)
    try{
      const response = await fetch('https://arkcityserver.vercel.app/subscribe',{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify({email:email})
      })
      if(!response.ok){
        throw Error('error subscribing')
      }
      toast.success('Thank you for subscribing to our News Letter');
      setEmail('');
    }catch(error){
      toast.error('an error occured');
    }finally{
      setLoading(false);
    }
  }

  

  const links = [
    { title: 'Home', href: '' },
    { title: 'About Us', href: '' },
    { title: 'Products', href: '' },
    {title: 'Safety Tips', href:''},
    {title:'Contact', href:''},
  ];

  const legalLinks = [
    {title:'Privacy Policy', href:''},
    {title:'Terms of Service', href:''},
    {title:'DPR License', href:''},
    {title:'SON certification', href:''}
  ]

  return (
    <section className="footer" style={{ padding: '40px 0' }}>
      <div className="container-fluid">
        <Row gutter={[32, 32]}>
          {/* Logo and Vision */}
          <Col lg={4} md={12} sm={24}>
           <Title level={3} style={{ color: '#fff' }}>Arkcity LPG</Title>
            
           <Row gutter={[0,12]}>
            <Col style={{ color: '#ccc' }} span={24}>
                <div>
                    12 Gas Plant Road <br/>Ikorodu, Lagos
                </div>
            </Col>
            <Col style={{ color: '#ccc' }} span={24}>
                <a href='tel:08138621241'target='_blank'><b>Phone</b>:+234 813 8621 241</a><br/>
                <a href='tel:09165068033'target='_blank'>+234 916 5068 033</a><br/>
                <a href='mailto:arkcitylpg@gmail.com' target='_blank'><b>Email</b>:arkcitylpg@gmail.com</a><br/>
                <b>Hours</b>: Mon-Sun: 8AM-8PM<br/>
            </Col>
           </Row>
          </Col>

          {/* Useful Links */}
          <Col lg={4} md={12} sm={24}>
            <Title level={4} style={{ color: '#fff' }}>Quick Links</Title>
            <Row gutter={[0, 12]}>
              {links.map((link, idx) => (
                <Col span={24} key={idx}>
                  <a href={link.href} style={{ color: '#ccc' }}>{link.title}</a>
                </Col>
              ))}
            </Row>
          </Col>

          {/* products */}
          <Col lg={4} md={12} sm={24}>
            <Title level={4} style={{ color: '#fff' }}>Products</Title>
            <Row gutter={[0, 12]}>
              {product?.filter((item)=>item.category.toLocaleLowerCase() =='refills').map((link, idx) => (
                <Col span={24} key={idx}>
                  <Link to={'/'} style={{ color: '#ccc' }}>{link.title}</Link>
                </Col>
              ))}
            </Row>
          </Col>

          {/* services services */}
         
          <Col lg={4} md={12} sm={24}>
            <Title level={4} style={{ color: '#fff' }}>Our Services</Title>
            <Row gutter={[0, 12]}>
              {serviceValues.map((link, idx) => (
                <Col span={24} key={idx}>
                  <a href='/#product' style={{ color: '#ccc' }}>{link.title}</a>
                </Col>
              ))}
            </Row>
          </Col>

        {/* Usefullegal Links */}
          <Col lg={4} md={12} sm={24}>
            <Title level={4} style={{ color: '#fff' }}>Legal</Title>
            <Row gutter={[0, 12]}>
              {legalLinks.map((link, idx) => (
                <Col span={24} key={idx}>
                  <Link to={link.href} style={{ color: '#ccc' }}>{link.title}</Link>
                </Col>
              ))}
            </Row>
          </Col>

          {/* Subscribe Form */}
          <Col lg={8} md={12} sm={24}>
            <Title level={4} style={{ color: '#fff' }}>Subscribe Now</Title>
            <Paragraph style={{ color: '#ccc' }}>
              Don’t miss our future updates! Get subscribed today!
            </Paragraph>
            <Form>
              <Form.Item>
                <Input
                  placeholder="Enter email here"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <FlatButton
                className="btndark"
                title="Subscribe"
                disabled={loading}
                onClick={handleSubscribe}
              />
            </Form>
          </Col>
        </Row>

        {/* Social Media Icons */}
        <div style={{ fontSize: '30px', marginTop: '30px' }}>
          <a
            href="https://www.instagram.com/thetrinityarmsfoundation?igsh=MjFvbTB2MjlzM255&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramOutlined />
          </a>
          <a
            href="https://www.facebook.com/share/1Eg8jui2ZL/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            style={{ marginLeft: '16px' }}
          >
            <FacebookOutlined />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" style={{ marginLeft: '16px' }}>
            <LinkedinOutlined />
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 40 }}>
        <a href="https://jozzycodes.com/" target="_blank" rel="noopener noreferrer">© 2025 Arkcity LPG</a>
      
      </div>
    </section>
  );
}

export default Footer;
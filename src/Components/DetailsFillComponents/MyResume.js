import React,{ useState } from 'react'
import { useSelector } from 'react-redux'
import {Link} from 'react-router-dom'
import jsPDF from 'jspdf'
import Template1 from '../TemplatesComponents/Template1'
import Template2 from '../TemplatesComponents/Template2'
import Template3 from '../TemplatesComponents/Template3'
import Template4 from '../TemplatesComponents/Template4'
import html2canvas from 'html2canvas'
import SuccessMessage from './Modal'
import {Row, Col} from 'antd'

function MyResume() {
    //this component shows the resume created by the user with the 'Save'and 'Back' button//
    const selectedTemplate = useSelector(state => state.dataStore.selectedTemplate)
    const [showModal, setShowModal] = useState(false)

    const downloadComponentPDF = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input, { scrollY: -window.scrollY })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF("p", "px", "a4");
            var ratio = canvas.width/canvas.height;
            var width = pdf.internal.pageSize.getWidth();
            var height = width / ratio;
            pdf.addImage(imgData, 'JPEG', 0, 0, width, height);
            pdf.save("resume.pdf");
        })
        .then(()=>{
            setTimeout(
                // this function shows the modal popup named 'SuccessMessage' after the resume has been successfully downloaded and make it to disappear on its own after 6000 ms//
                ()=>{
                    setShowModal(true)
                    setTimeout(
                        ()=>{
                            setShowModal(false)  
                        }
                    ,6000)
                }
            ,100)
        })
    ;
      }
    
    return (
        <div>
            <div className='d-flex mt-2 p-5' >
                <Link to="/detailsfillingpage/keyskills">
                    <button className='btn btn-primary me-4 p-2'> Go-Back</button>
                </Link>
                <button className='btn btn-success ms-3 p-2'onClick={downloadComponentPDF}>
                    Save Resume
                </button>
            </div>
            <Row gutter ={[16,16]}>
                <Col md={{span:16}}>
                    <div id='divToPrint' className=' resume' >
                        {selectedTemplate === "Template 1"
                        ?<Template1  />
                        :selectedTemplate === "Template 2"
                        ?<Template2  />
                        :selectedTemplate === "Template 3"
                        ?<Template3  />
                        :<Template4  />}
                    </div>
                </Col>
            </Row>
            
            <div><SuccessMessage showModal={showModal} setShowModal={setShowModal}/></div>

        </div>
        
    )
}

export default MyResume

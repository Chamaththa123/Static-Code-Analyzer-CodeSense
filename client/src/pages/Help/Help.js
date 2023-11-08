import React from 'react'
import Sidebar from '../../components/Layout/Sidebar'
import Header from '../../components/Layout/Header'

function Help() {
    return (
        <div>
            <Sidebar />
            <div className='main'>
                <Header />
                <div className='content'>
                    <center><h2><i>CodeSense</i> Support</h2></center>
                    <h5>How to Use:</h5>
                    <ul>
                        <li><b>Upload Your Java Code: </b> Click on the "Upload Code" button, select your Java file, and upload it. You'll instantly see your original code content.</li>
                        <li><b>Analyze Complexity: </b>Click the "Analyze Complexity" button to assess your code's complexity. Understand where improvements are needed to enhance performance and maintainability.</li>
                        <li><b>View Software Composition Metrics:</b>Explore software composition metrics to visualize your code's structure, class dependencies, and more.</li>
                        <li><b>Identify Syntax Errors: </b>Check for syntax errors in your code by clicking the "Check Syntax" button. We'll highlight any issues for you to address.</li>
                        <li><b>Detect Duplicated Code: </b>The "Detect Duplicates" feature will identify and display duplicated code segments, making it easy for you to refactor your codebase.</li>
                        <li><b>Recalculate Complexity: </b>After resolving duplicated code, use the "Recalculate Complexity" button to reassess your code's complexity without the redundancy.</li>
                    </ul>
                </div>
            </div>

        </div>
    )
}

export default Help

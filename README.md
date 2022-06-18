# wrihtml
## Example
1. Element with class
    ```
    var wrihtml = require('wrihtml');
    var html = wrihtml(
        `div [text-center bg-danger] This is a div`
    )
    ```

    ## Output: <div class="text-center bg-danger">This is a div</div>
    ```
    <div class="text-center bg-danger">This is a div</div>
    ```
    

2. Element with attributes
    ```
    var html = wrihtml(
    `button [class="btn btn-danger" onclick="alert('alert!')"] a button`
    )
    ```
    ## Output: <button class="btn btn-danger" onclick="alert('alert!')">a button</button>
    ```
    <button class="btn btn-danger" onclick="alert('alert!')">a button</button>
    ```
    
3. with child element
    ```
     div/ [col-12 col-md-6]
     h1  title 1 
     h2  title 2
     /div  
    ```
    ## Ouput
    <div class="col-12 col-md-6">
        <h1>title 1</h1>
        <h2>title 2</h2>
    </div>
    
    ```
    <div class="col-12 col-md-6">
        <h1>title 1</h1>
        <h2>title 2</h2>
    </div>
    ```
    
4. with multiple line inner text
    ```
     h1/ [text-dark] 
     // first line text in h1
     // 2nd line text in h1
     /h1
    ```
    ## Ouput
    <h1 class="text-dark">
    first line text in h1,
    2nd line text in h1
    </h1>
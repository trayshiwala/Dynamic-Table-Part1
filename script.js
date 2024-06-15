$(document).ready(function() {
    // To check for the right input ranges
    $.validator.addMethod("validRange", function(value, element, params) {
        const startRow = parseInt($("#startRow").val());
        const endRow = parseInt($("#endRow").val());
        const startCol = parseInt($("#startCol").val());
        const endCol = parseInt($("#endCol").val());

        // Skip range check if any field is empty or invalid
        if (isNaN(startRow) || isNaN(endRow) || isNaN(startCol) || isNaN(endCol)) {
            return true;
        }

        // Only perform validation if all related fields are filled out
        if (element.id === "startRow" || element.id === "endRow") {
            return startRow <= endRow;
        } else if (element.id === "startCol" || element.id === "endCol") {
            return startCol <= endCol;
        }

        return true;
    }, "Start value must be less than or equal to end value.");

    // Initialize jQuery validation
    $("#multiplicationForm").validate({
        errorClass: "error",
        rules: {
            startRow: { required: true, number: true, range: [-50, 50], validRange: true },
            endRow: { required: true, number: true, range: [-50, 50], validRange: true },
            startCol: { required: true, number: true, range: [-50, 50], validRange: true },
            endCol: { required: true, number: true, range: [-50, 50], validRange: true }
        },
        messages: {
            startRow: {
                required: "Please enter a start row",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            },
            endRow: {
                required: "Please enter an end row",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            },
            startCol: {
                required: "Please enter a start column",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            },
            endCol: {
                required: "Please enter an end column",
                number: "Please enter a valid number",
                range: "Please enter a number between -50 and 50"
            }
        },
        onfocusout: function(element) {
            if ($(element).val() !== "") {
                $(element).valid();
            }
        },
        errorPlacement: function(error, element) {
            error.insertAfter(element);
        },
        highlight: function(element, errorClass) {
            $(element).addClass(errorClass);
        },
        unhighlight: function(element, errorClass) {
            $(element).removeClass(errorClass);
        },
        submitHandler: function(form) {
            generateTable();
        }
    });

    function generateTable() {
        if (!$("#multiplicationForm").valid()) {
            return;
        }

        const startRow = parseInt($("#startRow").val());
        const endRow = parseInt($("#endRow").val());
        const startCol = parseInt($("#startCol").val());
        const endCol = parseInt($("#endCol").val());

        let table = '<table><thead><tr><th class="fixed-header"></th>';
        for (let col = startCol; col <= endCol; col++) {
            table += `<th class="fixed-header">${col}</th>`;
        }
        table += '</tr></thead><tbody>';
        for (let row = startRow; row <= endRow; row++) {
            table += `<tr><th class="fixed-header">${row}</th>`;
            for (let col = startCol; col <= endCol; col++) {
                table += `<td>${row * col}</td>`;
            }
            table += '</tr>';
        }
        table += '</tbody></table>';

        $("#tableContainer").html(table);
    }
});
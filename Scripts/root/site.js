var isFiltered = false;

$(document).ready(function () {
    console.log("jquery started");
    GetData();
});

function getPagination(table) {
    var lastPage = 1;

    $('#maxRows')
        .on('change', function (evt) {
            //$('.paginationprev').html('');						// reset pagination

            lastPage = 1;
            $('.pagination')
                .find('li')
                .slice(1, -1)
                .remove();
            var trnum = 0; // reset tr counter
            var maxRows = parseInt($(this).val()); // get Max Rows from select option

            if (maxRows == 5000) {
                $('.pagination').hide();
            } else {
                $('.pagination').show();
            }

            var totalRows = $(table + ' tbody tr').length; // numbers of rows
            $(table + ' tr:gt(1)').each(function () {
                // each TR in  table and not the header
                trnum++; // Start Counter
                if (trnum > maxRows) {
                    // if tr number gt maxRows

                    $(this).hide(); // fade it out
                }
                if (trnum <= maxRows) {
                    $(this).show();
                } // else fade in Important in case if it ..
            }); //  was fade out to fade it in
            if (totalRows > maxRows) {
                // if tr total rows gt max rows option
                var pagenum = Math.ceil(totalRows / maxRows); // ceil total(rows/maxrows) to get ..
                //	numbers of pages
                for (var i = 1; i <= pagenum;) {
                    // for each page append pagination li
                    $('.pagination #prev')
                        .before(
                            '<li class="page-item" data-page="' +
                            i +
                            '">\
                                    <span class="page-link">' +
                            i++ +
                            '</span>\
                                  </li>'
                        )
                        .show();
                } // end for i
            } // end if row count > max rows
            $('.pagination [data-page="1"]').addClass('active'); // add active class to the first li
            $('.pagination li').on('click', function (evt) {
                // on click each page
                evt.stopImmediatePropagation();
                evt.preventDefault();
                var pageNum = $(this).attr('data-page'); // get it's number

                var maxRows = parseInt($('#maxRows').val()); // get Max Rows from select option

                if (pageNum == 'prev') {
                    if (lastPage == 1) {
                        return;
                    }
                    pageNum = --lastPage;
                }
                if (pageNum == 'next') {
                    if (lastPage == $('.pagination li').length - 2) {
                        return;
                    }
                    pageNum = ++lastPage;
                }

                lastPage = pageNum;
                var trIndex = 0; // reset tr counter
                $('.pagination li').removeClass('active'); // remove active class from all li
                $('.pagination [data-page="' + lastPage + '"]').addClass('active'); // add active class to the clicked
                // $(this).addClass('active');					// add active class to the clicked
                limitPagging();
                $(table + ' tr:gt(1)').each(function () {
                    // each tr in table not the header
                    trIndex++; // tr index counter
                    // if tr index gt maxRows*pageNum or lt maxRows*pageNum-maxRows fade if out
                    if (
                        trIndex > maxRows * pageNum ||
                        trIndex <= maxRows * pageNum - maxRows
                    ) {
                        $(this).hide();
                    } else {
                        $(this).show();
                    } //else fade in
                }); // end of for each tr in table
            }); // end of on click pagination list
            limitPagging();
        })
        .val(10)
        .change();

}

function limitPagging() {
    // alert($('.pagination li').length)

    if ($('.pagination li').length > 9) {
        if ($('.pagination li.active').attr('data-page') <= 3) {
            $('.pagination li:gt(5)').hide();
            $('.pagination li:lt(5)').show();
            $('.pagination [data-page="next"]').show();
        } if ($('.pagination li.active').attr('data-page') > 3) {
            $('.pagination li:gt(0)').hide();
            $('.pagination [data-page="next"]').show();
            for (let i = (parseInt($('.pagination li.active').attr('data-page')) - 2); i <= (parseInt($('.pagination li.active').attr('data-page')) + 2); i++) {
                $('.pagination [data-page="' + i + '"]').show();

            }

        }
    }
}

function pageLoad() {

    getPagination('#myTable');
    var rowCount = $("#myTable tr").length;

    var currentRowDate;
    var currentRowName;
    var currentRowActivity;
    var currentRowDescription;
    var currentRowReference;
    var currentRowPriority;
    var currentRowHours;
    var currentRowForwarded;

    for (let id = 1; id < rowCount; id++) {
        let dateSelector = 'tableRowDate' + id;
        let nameSelector = 'tableRowName' + id;
        let activitySelector = 'tableRowActivity' + id;
        let descriptionSelector = 'tableRowDescription' + id;
        let referenceSelector = 'tableRowReference' + id;
        let prioritySelector = 'tableRowPriority' + id;
        let hourSelector = 'tableRowHours' + id;
        let forwardedSelector = 'tableRowForwarded' + id;

        $(`#${dateSelector}`).click(function () {

            checkPreviousField(currentRowDate, currentRowName, currentRowActivity,
                currentRowDescription, currentRowReference, currentRowPriority, currentRowHours, currentRowForwarded);

            currentRowDate = document.querySelector(`#${dateSelector}`);
            currentRowDate.insertAdjacentElement('beforebegin', editRowDate);
            currentRowDate.hidden = true;
            editDate.value = currentRowDate.innerText.trim();
            editRowDate.hidden = false;
        });

        $(`#${nameSelector}`).click(function () {

            checkPreviousField(currentRowDate, currentRowName, currentRowActivity,
                currentRowDescription, currentRowReference, currentRowPriority, currentRowHours, currentRowForwarded);

            currentRowName = document.querySelector(`#${nameSelector}`);
            currentRowName.insertAdjacentElement('beforebegin', editRowName);
            currentRowName.hidden = true;
            editName.value = currentRowName.innerText.trim();
            editRowName.hidden = false;
        });

        $(`#${activitySelector}`).click(function () {

            checkPreviousField(currentRowDate, currentRowName, currentRowActivity,
                currentRowDescription, currentRowReference, currentRowPriority, currentRowHours, currentRowForwarded);

            currentRowActivity = document.querySelector(`#${activitySelector}`);
            currentRowActivity.insertAdjacentElement('beforebegin', editRowActivity);
            currentRowActivity.hidden = true;
            editActivity.value = currentRowActivity.innerText.trim();
            editRowActivity.hidden = false;
        });

        $(`#${descriptionSelector}`).click(function () {

            checkPreviousField(currentRowDate, currentRowName, currentRowActivity,
                currentRowDescription, currentRowReference, currentRowPriority, currentRowHours, currentRowForwarded);

            currentRowDescription = document.querySelector(`#${descriptionSelector}`);
            currentRowDescription.insertAdjacentElement('beforebegin', editRowDescription);
            currentRowDescription.hidden = true;
            editDescription.value = currentRowDescription.innerText.trim();
            editRowDescription.hidden = false;
        });

        $(`#${referenceSelector}`).click(function () {

            checkPreviousField(currentRowDate, currentRowName, currentRowActivity,
                currentRowDescription, currentRowReference, currentRowPriority, currentRowHours, currentRowForwarded);

            currentRowReference = document.querySelector(`#${referenceSelector}`);
            currentRowReference.insertAdjacentElement('beforebegin', editRowReference);
            currentRowReference.hidden = true;
            editReference.value = currentRowReference.innerText.trim();
            editRowReference.hidden = false;
        });

        $(`#${prioritySelector}`).click(function () {

            checkPreviousField(currentRowDate, currentRowName, currentRowActivity,
                currentRowDescription, currentRowReference, currentRowPriority, currentRowHours, currentRowForwarded);

            currentRowPriority = document.querySelector(`#${prioritySelector}`);
            currentRowPriority.insertAdjacentElement('beforebegin', editRowPriority);
            currentRowPriority.hidden = true;
            editPriority.value = currentRowPriority.innerText.trim();
            editRowPriority.hidden = false;
        });

        $(`#${hourSelector}`).click(function () {

            checkPreviousField(currentRowDate, currentRowName, currentRowActivity,
                currentRowDescription, currentRowReference, currentRowPriority, currentRowHours, currentRowForwarded);

            currentRowHours = document.querySelector(`#${hourSelector}`);
            currentRowHours.insertAdjacentElement('beforebegin', editRowHours);
            currentRowHours.hidden = true;
            editHours.value = currentRowHours.innerText.trim();
            editRowHours.hidden = false;
        });

        $(`#${forwardedSelector}`).click(function () {

            checkPreviousField(currentRowDate, currentRowName, currentRowActivity,
                currentRowDescription, currentRowReference, currentRowPriority, currentRowHours, currentRowForwarded);

            currentRowForwarded = document.querySelector(`#${forwardedSelector}`);
            currentRowForwarded.insertAdjacentElement('beforebegin', editRowForwardedTeam);
            currentRowForwarded.hidden = true;
            editForwardedTeam.value = currentRowForwarded.innerText.trim();
            editRowForwardedTeam.hidden = false;
        });
    }

    updateButton.addEventListener("click", function () {
        console.log("updated clicked")
        if (currentRowDate) {
            editRowDate.hidden = true;
            currentRowDate.innerText = editDate.value;
            currentRowDate.hidden = false;
            editRow.insertAdjacentElement('beforebegin', editRowDate);
            currentRowDate = undefined;
        }
        if (currentRowName) {
            editRowName.hidden = true;
            currentRowName.innerText = editName.value;
            currentRowName.hidden = false;
            editRow.insertAdjacentElement('beforebegin', editRowName);
            currentRowName = undefined;
        }
        if (currentRowActivity) {
            editRowActivity.hidden = true;
            currentRowActivity.innerText = editActivity.value;
            currentRowActivity.hidden = false;
            editRow.insertAdjacentElement('beforebegin', editRowActivity);
            currentRowActivity = undefined;
        }
        if (currentRowDescription) {
            if (editDescription.value != '') {
                editRowDescription.hidden = true;
                currentRowDescription.innerText = editDescription.value;
                currentRowDescription.hidden = false;
                editRow.insertAdjacentElement('beforebegin', editRowDescription);
                currentRowDescription = undefined;
            } else {
                toastr.warning("Description is required!");
            }
        }
        if (currentRowReference) {
            editRowReference.hidden = true;
            currentRowReference.innerText = editReference.value;
            currentRowReference.hidden = false;
            editRow.insertAdjacentElement('beforebegin', editRowReference);
            currentRowReference = undefined;
        }
        if (currentRowPriority) {
            editRowPriority.hidden = true;
            currentRowPriority.innerText = editPriority.value;
            currentRowPriority.hidden = false;
            editRow.insertAdjacentElement('beforebegin', editRowPriority);
            currentRowPriority = undefined;
        }
        if (currentRowHours) {
            if (editHours.value != '') {
                editRowHours.hidden = true;
                currentRowHours.innerText = editHours.value;
                currentRowHours.hidden = false;
                editRow.insertAdjacentElement('beforebegin', editRowHours);
                currentRowHours = undefined;
            } else {
                toastr.warning("Hours spent is required!");
            }
        }
        if (currentRowForwarded) {
            editRowForwardedTeam.hidden = true;
            currentRowForwarded.innerText = editForwardedTeam.value;
            currentRowForwarded.hidden = false;
            editRow.insertAdjacentElement('beforebegin', editRowForwardedTeam);
            currentRowForwarded = undefined;
        }
    });

    cancelButton.addEventListener("click", function () {
        console.log("cancel clicked");

        if (currentRowDate) {
            editRowDate.hidden = true;
            editRow.insertAdjacentElement('beforebegin', editRowDate);
            currentRowDate.hidden = false;
        }
        if (currentRowName) {
            editRowName.hidden = true;
            editRow.insertAdjacentElement('beforebegin', editRowName);
            currentRowName.hidden = false;
        }
        if (currentRowActivity) {
            editRowActivity.hidden = true;
            editRow.insertAdjacentElement('beforebegin', editRowActivity);
            currentRowActivity.hidden = false;
        }
        if (currentRowDescription) {
            editRowDescription.hidden = true;
            editRow.insertAdjacentElement('beforebegin', editRowDescription);
            currentRowDescription.hidden = false;
        }
        if (currentRowReference) {
            editRowReference.hidden = true;
            editRow.insertAdjacentElement('beforebegin', editRowReference);
            currentRowReference.hidden = false;
        }
        if (currentRowPriority) {
            editRowPriority.hidden = true;
            editRow.insertAdjacentElement('beforebegin', editRowPriority);
            currentRowPriority.hidden = false;
        }
        if (currentRowHours) {
            editRowHours.hidden = true;
            editRow.insertAdjacentElement('beforebegin', editRowHours);
            currentRowHours.hidden = false;
        }
        if (currentRowForwarded) {
            editRowForwardedTeam.hidden = true;
            editRow.insertAdjacentElement('beforebegin', editRowForwardedTeam);
            currentRowForwarded.hidden = false;
        }
    });

    $("#checkedAll").change(function () {
        //console.log("clicked")
        if (this.checked) {
            $('input[type="checkbox"]').prop('checked', true);

        } else {
            $('input[type="checkbox"]').prop('checked', false);
        }
    });

    $(".editCheck").click(function () {
        if ($(this).is(":checked")) {
            var isAllChecked = 0;

            $(".editCheck").each(function () {
                if (!this.checked)
                    isAllChecked = 1;
            });
            //console.log(isAllChecked);
            if (isAllChecked == 0) {
                $("#checkedAll").prop("checked", true);
            }
        }
        else {
            $("#checkedAll").prop("checked", false);
        }
    });
}

function checkPreviousField(currentRowDate, currentRowName, currentRowActivity,
    currentRowDescription, currentRowReference, currentRowPriority, currentRowHours, currentRowForwarded) {

    if (currentRowDate) {
        updateButton.click();
    }
    if (currentRowName) {
        updateButton.click();
    }
    if (currentRowActivity) {
        updateButton.click();
    }
    if (currentRowDescription) {
        updateButton.click();
    }
    if (currentRowReference) {
        updateButton.click();
    }
    if (currentRowPriority) {
        updateButton.click();
    }
    if (currentRowHours) {
        updateButton.click();
    }
    if (currentRowForwarded) {
        updateButton.click();
    }
}

function clearData() {
    $('#insertDate').val('')
    $('#insertName').val('')
    // $('#insertTower').val('')
    $('#insertActivity').val('')
    $('#insertDescription').val('')
    $('#insertReference').val('')
    $('#insertPriority').val('')
    $('#insertHours').val('')
    $('#insertForwardedTeam').val('')
}
function removeData() {
    var rowCount = $("#myTable tr").length;

    for (let id = 1; id < rowCount; id++) {
        let selector = 'tableRow' + id;
        $(`#myTable tr[id=${selector}]`).remove();
    }

}

function openModal() {
    //console.log("modal opened");
    $('#myModal').show();
}
function closeModal() {
   // console.log("modal closed");
    $('#minDate').val("");
    $('#maxDate').val("");
    $('#empName').val("");
    $('#myModal').hide();
}

function addRow(element) {

    var lastRowId = $('#myTable tr:last').attr('id');
    //console.log(lastRowId);
    let dataLength = lastRowId.substring(8);

    let selector = 'tableRow' + dataLength;
    console.log(dataLength);
    let getDate = getFormattedDate(element.DateOfActivity);
    let getReference = replaceNullReference(element.Reference);
    let getPriority = replaceNullPriority(element.Priority);
    let getForwardedTeam = replaceNullForwarded(element.ForwardedTeam);

    var tableRow = `<tr id="tableRow${++dataLength}">
        <td hidden>${element.Id}</td>
        <td><input class="editCheck" type="checkbox"></td>
        <td id="tableRowDate${dataLength}">${getDate}</td>
        <td id="tableRowName${dataLength}" style="width: 120px;">${element.Name}</td>
        <td>${element.Tower}</td>
        <td id="tableRowActivity${dataLength}">${element.Activity}</td>
        <td id="tableRowDescription${dataLength}">${element.Description}</td>
        <td id="tableRowReference${dataLength}">${getReference}</td>
        <td id="tableRowPriority${dataLength}">${getPriority}</td>
        <td id="tableRowHours${dataLength}">${element.Hours}</td>
        <td id="tableRowForwarded${dataLength}">${getForwardedTeam}</td>
    </tr>`

    document.querySelector(`#${selector}`).insertAdjacentHTML('afterend', tableRow);
    clearData();
    pageLoad();
}

function loadTable(data) {
    var model = [];

    for (var i in data) {
        model.push(data[i]);
    }
    let id = 0;
    model.forEach(element => {
        // console.log(element);
        let selector = 'tableRow' + id;
        let getDate = getFormattedDate(element.DateOfActivity);
        let getReference = replaceNullReference(element.Reference);
        let getPriority = replaceNullPriority(element.Priority);
        let getForwardedTeam = replaceNullForwarded(element.ForwardedTeam);

        var tableRow = `<tr id="tableRow${++id}">
        <td hidden>${element.Id}</td>
        <td><input class="editCheck" type="checkbox"></td>
        <td id="tableRowDate${id}">${getDate}</td>
        <td id="tableRowName${id}" style="width: 120px;">${element.Name}</td>
        <td>${element.Tower}</td>
        <td id="tableRowActivity${id}">${element.Activity}</td>
        <td id="tableRowDescription${id}">${element.Description}</td>
        <td id="tableRowReference${id}">${getReference}</td>
        <td id="tableRowPriority${id}">${getPriority}</td>
        <td id="tableRowHours${id}">${element.Hours}</td>
        <td id="tableRowForwarded${id}">${getForwardedTeam}</td>
    </tr>`

        document.querySelector(`#${selector}`).insertAdjacentHTML('afterend', tableRow);
    });

    pageLoad();
}

function replaceNullReference(reference) {
    let empty = '';
    if (reference == null || reference == '') {
        return empty;
    }
    return reference;
}

function replaceNullPriority(priority) {
    let empty = '';
    if (priority == null || priority == '') {
        return empty;
    }
    return priority;
}

function replaceNullForwarded(forwardedTeam) {
    let empty = '';
    if (forwardedTeam == null || forwardedTeam == '') {
        return empty;
    }
    return forwardedTeam;
}

function getFormattedDate(dateTime) {
    //console.log(dateTime);
    var DateTime = new Date(parseInt(dateTime.substr(6)));
    var month = DateTime.getMonth() + 1;
    var formattedDate = DateTime.getDate() + '/' + month + '/' + DateTime.getFullYear();
    return formattedDate;
}

$(function () {
    $('#insertDate').datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true
    });

    $('#editDate').datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true
    });
    $('#minDate').datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true
    });
    $('#maxDate').datepicker({
        dateFormat: "dd-mm-yy",
        changeMonth: true,
        changeYear: true,
    });
})

function insertValidation() {
    var checkvalue = $('#insertDate').val();
    var checkName = $('#insertName').val();
    var checkActivity = $('#insertActivity').val();
    var checkDescription = $('#insertDescription').val();
    var checkHours = $('#insertHours').val();

    if (checkvalue == null || checkvalue == '') {
        console.log("date required");
        toastr.warning("Date is required");
        return false;
    }
    if (checkName == null || checkName == '') {
        console.log("name required");
        toastr.warning("Name is required");
        return false;
    }
    if (checkActivity == null || checkActivity == '') {
        console.log("activity required");
        toastr.warning("Activity is required");
        return false;
    }
    if (checkDescription == null || checkDescription == '') {
        console.log("Description required");
        toastr.warning("Description is required");
        return false;
    }
    if (checkHours == null || checkHours == '') {
        console.log("Hours required");
        toastr.warning("Hours spent is required");
        return false;
    }
    return true;
}

function clearFilter() {
    removeData();
    GetData();
    $('#clearFilter').hide();
    isFiltered = false;
}

// CRUD functions

function GetData() {
    $.ajax({
        type: "GET",
        url: "/Home/GetData",
        success: function (data) {
            loadTable(data);
        },
        error: function (_error) {
            console.log(_error);
            toastr.error("Failed to Load!");
        }
    })
}

function insert() {
    let validate = insertValidation();
    if (validate) {

        var model = {
            DateOfActivity: $('#insertDate').val(),
            Name: $('#insertName').val(),
            Tower: $('#insertTower').val(),
            Activity: $('#insertActivity').val(),
            Description: $('#insertDescription').val(),
            Reference: $('#insertReference').val(),
            Priority: $('#insertPriority').val(),
            Hours: $('#insertHours').val(),
            ForwardedTeam: $('#insertForwardedTeam').val()
        }

        $.ajax(
            {
                type: "POST",
                url: "/Home/Add",
                data: model,
                success: function (_response) {
                    //console.log(_response);
                    if (_response != null) {
                        addRow(_response);
                        toastr.success("One Row Added!");
                    } else {
                        toastr.error("Failed to Add!");
                    }
                },
                error: function (_error) {
                    console.log(_error);
                    toastr.error("Failed to Add!");
                }
            }
        )
    }
}

function saveSelected() {

    let tableRow;
    var numberOfrecordsSaved = 0;
    var numberOfrecordsSelected = 0;
    $(".editCheck").each(function () {
        if (this.checked == true) {
            tableRow = this.closest('tr');
            updateButton.click();
            numberOfrecordsSelected++;

            $(this).prop('checked', false);
            if ($("#checkedAll").val() == 'on') {
                $("#checkedAll").prop('checked', false);
            }

            var id = tableRow.cells[0].innerText.trim();
            var dateOfActivity = tableRow.cells[2].innerText.trim();
            var name = tableRow.cells[3].innerText.trim();
            var tower = tableRow.cells[4].innerText.trim();
            var activity = tableRow.cells[5].innerText.trim();
            var description = tableRow.cells[6].innerText.trim();
            var reference = tableRow.cells[7].innerText.trim();
            var priority = tableRow.cells[8].innerText.trim();
            var hours = tableRow.cells[9].innerText.trim();
            var forwardedTeam = tableRow.cells[10].innerText.trim();

            var model = {
                Id: id,
                DateOfActivity: dateOfActivity,
                Name: name,
                Tower: tower,
                Activity: activity,
                Description: description,
                Reference: reference,
                Priority: priority,
                Hours: hours,
                ForwardedTeam: forwardedTeam
            }
            //console.log(model);
            $.ajax(
                {
                    type: "POST",
                    url: "/Home/Save",
                    data: model,
                    success: function (_response) {
                        if (_response != null) {
                            numberOfrecordsSaved++;
                            //console.log(numberOfrecordsSaved, numberOfrecordsSelected);
                            if (numberOfrecordsSelected == numberOfrecordsSaved)
                                toastr.success(numberOfrecordsSaved + " records saved successfully");
                        } else {
                            toastr.error("Failed to save!");
                        }  
                    },
                    error: function (_error) {
                        console.log(_error);
                        toastr.error("Failed to save!");
                    }
                }
            )

        }
    });

    if (!tableRow)
        toastr.error("select atleast one row to save!");
}

function deleteSelected() {
    var tableRow;
    var numberOfrecordsSelected = 0;
    var numberOfrecordsDeleted = 0;
    $(".editCheck").each(function () {
        if (this.checked == true) {
            tableRow = this.closest('tr');
            numberOfrecordsSelected++;
        }
    });
    if (!tableRow)
        toastr.error("select atleast one row to delete!");
    else {
        let record = "record"
        if (numberOfrecordsSelected > 1)
            record = "records"
        var deleteConfirm = confirm("Are you sure want to delete " + numberOfrecordsSelected + " " + record + "?");
        if (deleteConfirm) {
            $(".editCheck").each(function () {
                if (this.checked == true) {
                    tableRow = this.closest('tr');
                    var id = tableRow.cells[0].innerText.trim();

                    tableRow.remove();
                    if ($("#checkedAll").val() == 'on') {
                        $("#checkedAll").prop('checked', false);
                    }

                    var model = {
                        Id: id
                    }

                    $.ajax(
                        {
                            type: "POST",
                            url: "/Home/Delete",
                            data: model,
                            success: function (_response) {
                                if (_response != null) {
                                    numberOfrecordsDeleted++;
                                    pageLoad();

                                    if (numberOfrecordsSelected == numberOfrecordsDeleted)
                                        toastr.success(numberOfrecordsDeleted + " records deleted sucessfully");
                                } else {
                                    toastr.error("Failed to Delete!");
                                }
                            },
                            error: function (_error) {
                                console.log(_error);
                                toastr.error("Failed to Delete!");
                            }
                        }
                    )
                }
            });
        }
    }
}

function cloneSelected() {
    let tableRow;
    var numberOfrecordsSelected = 0;
    var numberOfrecordsCloned = 0;
    $(".editCheck").each(function () {
        if (this.checked == true) {
            tableRow = this.closest('tr');
            numberOfrecordsSelected++;

            $(this).prop('checked', false);

            if ($("#checkedAll").val() == 'on') {
                $("#checkedAll").prop('checked', false);
            }

            var model = {
                Id: tableRow.cells[0].innerText.trim()
            }
            $.ajax(
                {
                    type: "POST",
                    url: "/Home/Clone",
                    data: model,
                    success: function (_response) {
                        numberOfrecordsCloned++;
                        addRow(_response);
                        if (numberOfrecordsCloned == numberOfrecordsSelected)
                            toastr.success(numberOfrecordsCloned + " records cloned successfully!");
                    },
                    error: function (_error) {
                        toastr.error("Failed to clone!");
                        //toastr.warning("Save before clone this row!");
                    }
                }
            )
        }
    });
    if (!tableRow)
        toastr.error("select atleast one row to clone!");
}

function download() {
    console.log("download started");

    if (!isFiltered)
        location.href = "/Home/Download";
    else
        location.href = "/Home/FilterDownload";

    console.log("download completed!");
}

function filter() {


    var minDate = $('#minDate').val();
    var maxDate = $('#maxDate').val();
    if (minDate == '' || maxDate == '') {
        minDate = null;
        maxDate = null;
    }
    var name = $('#empName').val();
    if (name == '') {
        name = null;
    }
    var model = {
        Id: 1,
        startDate: minDate,
        endDate: maxDate,
        Name: name
    }

    //console.log(model);

    $.ajax({
        type: "POST",
        url: "/Home/PostFilter",
        data: model,
        success: function (_response) {
            //console.log("filtered!");
            GetFilteredData();
        }
    })
}

function GetFilteredData() {
    $.ajax({
        type: "GET",
        url: "/Home/GetFilteredData",
        success: function (_response) {
                removeData();
                loadTable(_response);
                closeModal();
                //console.log("filltered");
                isFiltered = true;
                $('#clearFilter').show();
        },
        error: function (error) {
            //console.log(error)
            toastr.warning("select any values to filter")
        }
    })
}
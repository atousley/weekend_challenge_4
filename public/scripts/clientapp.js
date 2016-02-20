$(document).ready(function(){
    getTasks();
    $('#task_form').on('submit', addTask);
    $('.task_list').on('click', '.complete', completeTask);
    $('.task_list').on('click', '.delete', deleteTask);
});

function addTask() {
    event.preventDefault();

    var results = {};

    $.each($('#task_form').serializeArray(), function(i, field) {
        results[field.name] = field.value;
    });

    $.ajax({
        type: 'POST',
        url: '/new_task',
        data: results,
        success: function(data) {
            if(data) {
                getNewTask();
            } else {
                console.log('error');
            }
            $('#task_form').find('input[type=text]').val('');
        }
    });
}

function getNewTask() {
    $.ajax({
        type: 'GET',
        url: '/new_task',
        success: function (data) {
            appendTasks(data);
        }
    });
}

function getTasks() {
    $.ajax({
        type: 'GET',
        url: '/get_all',
        success: function (data) {
            $('.task_list').children().remove();
            appendTasks(data);
            getComplete();
        }
    });
}

function appendTasks(data) {

    data.forEach(function(task) {
        $('.task_list').append('<div class="tasks" id="task-' + task.id + '"></div>');

        var $el = $('.task_list').children().last();

        //$el.append('<p>Task Id: ' + task.id + ' </p>');
        $el.append('<p>Task: ' + task.task + '</p>');
        $el.append('<button class="complete" data-id = " '+ task.id +' ">Complete</button>');
        $el.append('<button class="delete" data-delete = " '+ task.id +' ">Delete</button>');
    });
}

function completeTask() {
    event.preventDefault();

    var completed = {};
    var index = $(this).data('id');

    completed.task = index;
    //console.log(completed);

    $.ajax({
        type: 'POST',
        url: '/complete',
        data: completed,
        success: function(data) {
            if(data) {
                getComplete();
            } else {
                console.log('error');
            }
        }
    });
}

function getComplete() {
    $.ajax({
        type: 'GET',
        url: '/complete',
        success: function (data) {
            showComplete(data);
        }
    });
}

function showComplete(data) {

    data.forEach(function(task) {
        $('#task-' + task.id).addClass('completed');
        $('#task-' + task.id).find('.complete').addClass('checked');
        $('#task-' + task.id).find('.complete').text('Done!');
    });
}

function deleteTask() {
    event.preventDefault();

  var ask = confirm('Are you sure you want to delete this task?');
    if(ask == true) {
        var deleted = {};
        var index = $(this).data('delete');

        deleted.task = index;
        //console.log(deleted);

        $.ajax({
            type: 'POST',
            url: '/delete',
            data: deleted,
            success: function (data) {
                if (data) {
                    getTasks();
                } else {
                    console.log('error');
                }
            }
        });
    }
}


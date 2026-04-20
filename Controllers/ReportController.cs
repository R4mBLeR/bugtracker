// Controllers/ReportController.cs - с ActionResult
using BugTrackerWebAPI.DTOs;
using BugTrackerWebAPI.Models;
using BugTrackerWebAPI.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ReportController : ControllerBase
{
    private readonly IReportService _reportService;
    private readonly ILogger<ReportController> _logger;

    public ReportController(IReportService reportService, ILogger<ReportController> logger)
    {
        _reportService = reportService;
        _logger = logger;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Report>>> GetAllReports()
    {
        try
        {
            var reports = await _reportService.GetAllReportsAsync();
            return Ok(reports);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при получении всех репортов");
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Report>> GetReportById(int id)
    {
        try
        {
            var report = await _reportService.GetReportByIdAsync(id);
            return Ok(report);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Ошибка при получении репорта {id}");
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    [HttpPost]
    public async Task<ActionResult<Report>> CreateReport([FromBody] CreateReportDto createReportDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var report = await _reportService.CreateReportAsync(createReportDto);
            return CreatedAtAction(nameof(GetReportById), new { id = report.Id }, report);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Ошибка при создании репорта");
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    [HttpPut("status")]
    public async Task<ActionResult<Report>> UpdateReportStatus([FromBody] UpdateReportStatusDto updateReportDto)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        try
        {
            var report = await _reportService.UpdateReportStatusAsync(updateReportDto);
            return Ok(report);
        }
        catch (KeyNotFoundException)
        {
            return NotFound($"Репорт с ID {updateReportDto.Id} не найден");
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Ошибка при обновлении статуса репорта {updateReportDto.Id}");
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteReport(int id)
    {
        try
        {
            var result = await _reportService.DeleteReportAsync(id);
            if (!result)
            {
                return NotFound($"Репорт с ID {id} не найден");
            }

            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, $"Ошибка при удалении репорта {id}");
            return StatusCode(500, "Внутренняя ошибка сервера");
        }
    }
}